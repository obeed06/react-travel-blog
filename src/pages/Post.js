import './Post.css'
import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import {PortableText} from "@portabletext/react";
import {getPostAndRelatedPostsForCategory} from "../lib/postApi";
import {getHeadingsFromPostBodyJson, hyphenate} from "../lib/postUtils";
import {useLocation, useParams} from "react-router";
import HeaderAndFooter from "../components/HeaderAndFooter";
import TableOfContentsDrawer from "../components/post/toc/TableOfContentsDrawer";
import FeaturedPosts from "../components/post/FeaturedPosts";
import Button from "@mui/material/Button";
import {getClient} from "../lib/client";
import urlBuilder from "@sanity/image-url";
import Meta from "../components/Meta";

const useStyles = makeStyles((theme) => ({
    postLanding: {
        "&::after": {
            backgroundColor: theme.palette.background.default,
        }
    },
}));

const Post = ({dispatch, preview = false}) => {
    const classes = useStyles();
    let {slug} = useParams();
    let location = useLocation();
    const [post, setPost] = useState(null);
    const [nestedHeadings, setNestedHeadings] = useState(null);
    const postBodyTopRef = useRef(null)
    const postBodyBottomRef = useRef(null)

    useEffect(() => {
        getPostAndRelatedPostsForCategory(slug, preview)
            .then((data) => {
                setPost(data);
                typeof (data) !== 'undefined' && data !== null && setNestedHeadings(getHeadingsFromPostBodyJson(data?.body));
            })
            .catch(console.error);
    }, [slug, preview, dispatch]);

    return <HeaderAndFooter>
        {
            typeof (post) !== 'undefined' && post !== null ? (
                <Box>
                    <Meta type="article" title={post.title} description={post.summary}
                          path={location.pathname}
                          image={urlBuilder(getClient(false))
                        .image(post?.mainImage)
                        .fit('crop')
                        .width(1200)
                        .height(630)
                        .url()} />
                    <Box className={[classes.postLanding, "postLanding"]}
                         style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)), url(" + post?.mainImage?.asset?.url + ")"}}>
                        <Grid sx={{height: "100%"}} container direction="column" justifyContent="center"
                              alignItems="center">
                            <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={1}
                                   style={{height: "80%"}}>
                                <Typography
                                    gutterBottom
                                    variant="h3"
                                    component="h1"
                                >
                                    {post.title}
                                </Typography>
                                <Divider style={{borderColor: "rgba(255, 255, 255, 0.15)", width: "75%"}}/>
                                <span
                                    className="postCardAuthor">By {post.author.name} on {Moment(post.publishedAt).format('DD MMMM YYYY')}</span>
                            </Stack>
                        </Grid>
                    </Box>
                    <Container maxWidth='md' sx={{my: 5}}>
                        <DestinationBreadcrumbs destinations={post?.destinations}/>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Box ref={postBodyBottomRef} className="post_body">
                                    <span ref={postBodyTopRef}></span>
                                    <PortableText value={post?.body}/>
                                </Box>
                            </Grid>
                        </Grid>
                        <ChipCategories categories={post?.categories}/>
                    </Container>
                    <Container maxWidth='lg'>
                        {/*<Comments comments={post.comments} />*/}
                        {/*<Form _id={post._id} />*/}
                        <FeaturedPosts featuredPostsData={post?.relatedPosts} headingTitle="Related Posts."/>
                    </Container>
                    <TableOfContentsDrawer nestedHeadings={nestedHeadings} intersectTopRef={postBodyTopRef}
                                           intersectBottomRef={postBodyBottomRef}/>
                </Box>
            ) : (
                <Box>
                    <Box className="postLanding">
                        <Grid sx={{height: "100%"}} container direction="row" justifyContent="center" alignItems="end">
                            <Skeleton sx={{mb: 5}} height={80} width={"40%"}/>
                        </Grid>
                    </Box>
                </Box>
            )
        }
    </HeaderAndFooter>

};

const DestinationBreadcrumbs = ({destinations}) => {
    return <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>}
                        aria-label="breadcrumb">
        <Button color="primary" size="small"><Link href="/" underline="none">Home</Link></Button>
        {
            destinations && Array.isArray(destinations) ?
                (
                    destinations.map((d, i) => <Button color="primary" size="small" key={i + d.name}>
                        <Link underline="none" href={"/destination/" + d?.slug.current}>{d.name}</Link>
                    </Button>)
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
                    <Chip key={i + c.title} clickable style={{color: c?.colourHex, borderColor: c?.colourHex}}
                          component={Link}
                          href={"/posts?category=" + c.title}
                          variant="outlined"
                          size="small"
                          label={c?.title}/>))}
            </Stack>

        </React.Fragment>
        : ""
}

export default Post;