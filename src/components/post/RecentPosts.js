import React from "react";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PostCard from "./PostCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobilePostCard from "./MobilePostCard";
import HeroPostCard from "./HeroPostCard";

export default function RecentPosts({recentPostsData, checked, actions}) {
    const matches = useMediaQuery('(min-width:656px)');
    return (
        <Box id="recentPosts">
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Recent Posts.
                    </Typography>
                </Parallax>
            </Container>
            {matches ?
                <Container maxWidth='lg'>
                    <Grid container direction="row" justifyContent="space-between"
                          spacing={2} sx={{position: "relative"}}>
                        {recentPostsData &&
                        recentPostsData.map((post, i) => {
                                if (i === 0)
                                    return (
                                        <Grid sm={12} item key={i}>
                                            <HeroPostCard post={post}/>
                                        </Grid>
                                    );
                                return (
                                    <Grid sm={6} md={4} lg={3} item key={i}><PostCard post={post} key={i} checked={checked}/></Grid>
                                );
                            }
                        )}
                    </Grid>
                    {actions}
                </Container>
                :
                <Grid container direction="column" justifyContent="flex-start" alignItems="stretch"
                      sx={{position: "relative"}}>
                    {recentPostsData &&
                    recentPostsData.map((post, i) => (
                        <Grid item key={i}><MobilePostCard post={post}/></Grid>
                    ))}
                    {actions}
                </Grid>
            }
        </Box>
    );
}