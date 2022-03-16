import React from "react";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PostCard from "./PostCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobilePostCard from "./MobilePostCard";
import HeroPostCard from "./HeroPostCard";
import SkeletonPostCard from "./SkeletonPostCard";
import SkeletonHeroPostCard from "./SkeletonHeroPostCard";

export default function PostsGrid({postsData, checked, header, actions}) {
    const matches = useMediaQuery('(min-width:656px)');
    return (
        <Box id="recentPosts">
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    {postsData && postsData.length === 0 ? "" : header}
                </Parallax>
            </Container>
            {matches ?
                <Container maxWidth='lg'>
                    <Grid container direction="row" justifyContent="flex-start"
                          spacing={2} sx={{position: "relative"}}>
                        {
                            postsData ?
                            (
                                postsData.map((post, i) => {
                                    if (i === 0)
                                        return (
                                            <Grid sm={12} item key={i}>
                                                <HeroPostCard post={post}/>
                                            </Grid>
                                        );
                                    return (
                                        <Grid sm={6} md={4} lg={3} item key={i}><PostCard post={post} key={i} checked={checked}/></Grid>
                                    );
                                })
                            ) : (
                                <React.Fragment>
                                    <Grid sm={12} item key="skeleton-hfp">
                                        <SkeletonHeroPostCard />
                                    </Grid>
                                    {
                                        [...Array(8)].map((e, i) => (
                                            <Grid sm={6} md={4} lg={3} item key={"skeleton-p-"+i}>
                                                <SkeletonPostCard />
                                            </Grid>
                                        ))
                                    }
                                </React.Fragment>
                            )
                        }
                    </Grid>
                    {actions}
                </Container>
                :
                <Grid container direction="column" justifyContent="flex-start" alignItems="stretch"
                      sx={{position: "relative"}}>
                    {postsData &&
                    postsData.map((post, i) => (
                        <Grid item key={"mobile-post-"+i}><MobilePostCard post={post}/></Grid>
                    ))}
                    {actions}
                </Grid>
            }
        </Box>
    );
}