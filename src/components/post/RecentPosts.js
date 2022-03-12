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

export default function RecentPosts({recentPostsData}) {
    const checked = useWindowPosition("mapSection")
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box id="recentPosts">
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
                        Recent Posts.
                    </Typography>
                </Parallax>
            </Container>
            { matches ?
                <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={{xs: 1, md: 3}}
                      columns={{xs: 1, sm: 2, md: 8}} sx={{position: "relative"}}>
                    {recentPostsData &&
                    recentPostsData.map((post, i) => (
                        <Grid item key={i}><PostCard post={post} key={i} checked={checked} timeout={i}/></Grid>
                    ))}
                </Grid>
                :
                <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" sx={{position: "relative"}}>
                    {recentPostsData &&
                    recentPostsData.map((post, i) => (
                        <Grid item key={i}><MobilePostCard post={post}/></Grid>
                    ))}
                </Grid>
            }




        </Box>
    );
}