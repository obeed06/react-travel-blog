import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import sanityClient from "../client";
import RecentPosts from "../components/post/RecentPosts";

const Posts = () => {
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

    return (
        <Box id="postsSection" className="section" sx={{py: 5}}>
            <RecentPosts recentPostsData={postsData} checked={true} />
        </Box>
    );
};

export default Posts;