import React from "react";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PostCard from "./PostCard";
import useWindowPosition from "../../hook/useWindowPosition";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobilePostCard from "./MobilePostCard";
import Button from "@mui/material/Button";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import HeroPostCard from "./HeroPostCard";

export default function RecentPosts({recentPostsData}) {
    const checked = useWindowPosition("mapSection")
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
                                    <Grid sm={6} md={4} lg={3} item key={i}><PostCard post={post} key={i} checked={checked} timeout={i}/></Grid>
                                );
                            }
                        )}
                    </Grid>
                    {olderPostBtn()}
                </Container>

                :
                <Grid container direction="column" justifyContent="flex-start" alignItems="stretch"
                      sx={{position: "relative"}}>
                    {recentPostsData &&
                    recentPostsData.map((post, i) => (
                        <Grid item key={i}><MobilePostCard post={post}/></Grid>
                    ))}
                    {olderPostBtn()}
                </Grid>


            }

        </Box>
    );
}

function olderPostBtn() {
    return (
        <Grid container item direction="row" justifyContent="flex-end" alignItems="center" sx={{pt: 3}}>
            <Button variant="outlined" endIcon={<DoubleArrowIcon/>}>OLDER POSTS</Button>
        </Grid>
    );
}