import React, {useEffect, useState} from "react";
import sanityClient from "../client.js";
import Container from "@mui/material/Container";
import {Parallax} from "react-scroll-parallax";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PostCard from "./cards/PostCard";
import useWindowPosition from "../hook/useWindowPosition";

export default function RecentPosts() {
    const [recentPostsData, setRecentPosts] = useState(null);
    const checked = useWindowPosition("recentPosts")

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "post"] | order(publishedAt desc)[0..19] {
                    title,
                    "authorName": author->name,
                    publishedAt,
                    "country": countries[]->name[0],
                    "category": categories[]->{title, "colourHex": colour.hex}[0],
                    slug,
                    mainImage{
                      asset->{
                      _id,
                      url
                    }
                  }
                }`
            )
            .then((data) => setRecentPosts(data))
            .catch(console.error);
    }, []);

    return (
        <Box id="recentPosts" className="section" sx={{py: 5}}>
            <Container maxWidth='lg'>
                <Parallax translateY={['0', '+48']}>
                    <Typography vairant="h1" component="h2" className="sectionHeader">
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