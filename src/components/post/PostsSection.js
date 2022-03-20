import './PostsSection.css'
import React from "react";
import Box from "@mui/material/Box";
import FeaturedPosts from "./FeaturedPosts";
import PostsGrid from "./PostsGrid";
import useWindowPosition from "../../hook/useWindowPosition";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    featuredPostSection: {
        "&::before": {
            backgroundColor: theme.palette.background.default,
        }
    },
}));

export default function PostsSection({posts}) {
    const classes = useStyles();
    const checked = useWindowPosition("mapSection");

    if (!posts) return <div>Loading...</div>;
    let featuredPosts = posts.filter(p => {
        return p.isFeatured
    }).slice(0, 4)
    let recentPosts = posts.filter(p => {
        return !featuredPosts.includes(p)
    })
    let sectionBGUrl = featuredPosts[0]?.mainImage?.asset?.url;
    return (
        <Box id="postsSection" className="section" sx={{py: 5}}>
            <Box className={[classes.featuredPostSection, "featuredPostSection"]}
                 sx={{backgroundImage: "url(" + sectionBGUrl + ")"}}>
                <FeaturedPosts featuredPostsData={featuredPosts}/>
            </Box>
            <Box sx={{zIndex: "4", marginTop: "-15px"}}>
                <PostsGrid postsData={recentPosts} checked={checked} actions={olderPostBtn()}
                           header={
                               <Typography variant="h1" component="h2" className="sectionHeader">
                                   Recent Posts.
                               </Typography>
                           }
                />
            </Box>
        </Box>
    );
}

function olderPostBtn() {
    return (
        <Grid container item direction="row" justifyContent="flex-end" alignItems="center" sx={{pt: 3}}>
            <Button component={Link} to="/posts" variant="outlined" endIcon={<DoubleArrowIcon/>}>OLDER POSTS</Button>
        </Grid>
    );
}