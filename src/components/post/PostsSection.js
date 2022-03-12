import React, {useEffect, useState} from "react";
import sanityClient from "../../client.js";
import Box from "@mui/material/Box";
import FeaturedPosts from "./FeaturedPosts";
import RecentPosts from "./RecentPosts";

export default function PostsSection() {
    const [postsData, setPosts] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "post"][0..16] | order(publishedAt desc) {
                    title,
                    "authorName": author->name,
                    publishedAt,
                    "country": countries[]->name[0],
                    "category": categories[]->{
                        "colourHex": colour.hex,
                        title
                    }[0],
                    slug,
                    isFeatured,
                    mainImage{
                      asset->{
                      _id,
                      url
                    }
                  }
                }`
            )
            .then((data) => setPosts(data))
            .catch(console.error);
    }, []);
    if (!postsData) return <div>Loading...</div>;

    let featuredPosts = postsData.filter(p => { return p.isFeatured}).slice(0, 4)
    let recentPosts = postsData.filter(p => { return !featuredPosts.includes(p)})
    let sectionBGUrl = featuredPosts[0]?.mainImage?.asset?.url;
    return (
        <Box id="postsSection" className="section" sx={{py: 5}}>
                <Box className="featuredPostSection"  style={{backgroundImage: "url("+sectionBGUrl+")"}}>
                    <FeaturedPosts featuredPostsData={featuredPosts} />
                </Box>
            <RecentPosts recentPostsData={recentPosts}/>
        </Box>
    );
}