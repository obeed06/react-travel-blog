import React from "react";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostCard from "./cards/PostCard";
import useWindowPosition from "../hook/useWindowPosition";
import Stack from "@mui/material/Stack";

export default function FeaturedPosts({featuredPostsData}) {
    const checked = useWindowPosition("mapSection")

    return (
        <Box id="featuredPosts">
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+58']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader" style={{color: "#d1deea"}}>
                        Featured.
                    </Typography>
                </Parallax>
            </Container>
            <Stack direction="row" justifyContent="center" spacing={2} className="cardYScroll" sx={{pt:1, pb: 5, pl: 5}}>
                {featuredPostsData &&
                featuredPostsData.map((post, i) => (
                    <PostCard slugPrefix="/post/" post={post} key={i} checked={checked} timeout={i}/>
                ))}
            </Stack>
        </Box>
    );
}