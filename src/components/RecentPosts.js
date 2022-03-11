import React from "react";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PostCard from "./cards/PostCard";
import useWindowPosition from "../hook/useWindowPosition";

export default function RecentPosts({recentPostsData}) {
    const checked = useWindowPosition("postsSection")

    return (
        <Box id="recentPosts">
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader" style={{color: "black"}}>
                        Recent Posts.
                    </Typography>
                </Parallax>
            </Container>
            <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={{xs: 1, md: 3}}
                  columns={{xs: 1, sm: 2, md: 8}} sx={{position: "relative"}}>
                {recentPostsData &&
                recentPostsData.map((post, i) => (
                    <Grid item key={i}><PostCard slugPrefix="/post/" post={post} key={i} checked={checked} timeout={i}/></Grid>
                ))}
            </Grid>
        </Box>
    );
}