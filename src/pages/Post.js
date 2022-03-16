import './Post.css'
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import BlockContent from "@sanity/block-content-to-react";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";

const useStyles = makeStyles((theme) => ({
    postLanding: {
        "&::after": {
            backgroundColor: theme.palette.background.default,
        }
    },
}));

const Post = () => {
    const classes = useStyles();
    const [post, setPost] = useState(null)
    let {slug} = useParams();
    useEffect(() => {
        sanityClient.fetch(`*[_type == "post" && slug.current == "${slug}"][0]{
                 title,
                    "authorName": author->name,
                    publishedAt,
                    destinations[]->{name,slug},
                    categories[]->{title, 'colourHex':colour.hex},
                    slug,
                    isFeatured,
                    mainImage{
                      asset->{
                            _id,
                            url
                        }
                    },
                    body
             }`)
            .then((data) => setPost(data))
            .catch(console.error);
    }, [slug]);
    return typeof (post) !== 'undefined' && post !== null ? (
        <Box>
            <Box className={[classes.postLanding, "postLanding"]}
                 style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)), url(" + post?.mainImage?.asset?.url + ")"}}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={1}
                           style={{height: "80%"}}>
                        <Typography
                            gutterBottom
                            variant="h3"
                            component="h1"
                            className="cardHeader"
                            style={{fontSize: "45px", textAlign: "center"}}
                        >
                            {post.title}
                        </Typography>
                        <Divider style={{borderColor: "rgba(255, 255, 255, 0.15)", width: "75%"}}/>
                        <span
                            className="postCardAuthor">By {post.authorName} on {Moment(post.publishedAt).format('DD MMMM YYYY')}</span>
                    </Stack>
                </Grid>
            </Box>
            <Container maxWidth='md' sx={{my: 5}}>
                <DestinationBreadcrumbs destinations={post?.destinations}/>
                <BlockContent blocks={post?.body} projectId="ho3u0oh3" dataset="production"/>
                <ChipCategories categories={post?.categories}/>
            </Container>
        </Box>
    ) : (
        <Box>
            <Box className="postLanding">
                <Grid sx={{height: "100%"}} container direction="row" justifyContent="center" alignItems="end">
                    <Skeleton sx={{mb: 5}} height={80} width={"40%"}/>
                </Grid>
            </Box>
        </Box>
    );
};

const DestinationBreadcrumbs = ({destinations}) => {
    return <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>}
                        aria-label="breadcrumb">
        <Link href="/" underline="hover">Home</Link>
        {
            destinations && Array.isArray(destinations) ?
                (
                    destinations.map((d, i) => <Link key={i+d.name} href={"/destination/" + d?.slug.current}
                                                     underline="hover">{d.name}</Link>)
                ) : ""
        }
    </Breadcrumbs>
}

const ChipCategories = ({categories}) => {
    return categories && Array.isArray(categories) ?
        <React.Fragment>
            <Stack direction="row" spacing={1} alignItems="center">
                <strong>CATEGORIES</strong>
                {categories.map((c, i) => (
                    <Chip key={i+c.title} clickable style={{color: c?.colourHex, borderColor: c?.colourHex}} variant="outlined"
                          size="small"
                          label={c?.title}/>))}
            </Stack>

        </React.Fragment>
        : ""
}

export default Post;