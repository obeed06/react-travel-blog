import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import sanityClient from "../client";
import PostsGrid from "../components/post/PostsGrid";
import Typography from "@mui/material/Typography";

const Posts = () => {
    const [postsData, setPosts] = useState(null);
    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "post"][0..16] | order(publishedAt desc) {
                    title,
                    "authorName": author->name,
                    publishedAt,
                   'destinationNames': destinations[]->name,
                    categories[]->{title, 'colourHex':colour.hex},
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
    return (
        <Box id="postsSection" className="section" sx={{py: 5}}>
            <PostsGrid postsData={postsData} checked={true}
                       header={
                           <Typography vairant="h1" component="h2" className="sectionHeader">
                               Posts.
                           </Typography>
                       }
            />
        </Box>
    );
};

export default Posts;