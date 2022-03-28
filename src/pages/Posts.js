import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import PostsGrid from "../components/post/PostsGrid";
import Typography from "@mui/material/Typography";
import {getAllPosts} from "../lib/postApi";
import HeaderAndFooter from "../components/HeaderAndFooter";

const Posts = ({preview = false}) => {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        getAllPosts(preview)
            .then((data) => setPosts(data))
            .catch(console.error);
    }, [preview]);
    return <HeaderAndFooter>
        <Box id="postsSection" className="section" sx={{py: 5}}>
            <PostsGrid postsData={posts} checked={true}
                       header={
                           <Typography vairant="h1" component="h2" className="sectionHeader">
                               Posts.
                           </Typography>
                       }
            />
        </Box>
    </HeaderAndFooter>
};

export default Posts;