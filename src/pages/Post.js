import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import PostTags from "../components/post/PostTags";
import Divider from "@mui/material/Divider";
import Moment from "moment";

const Post = () => {
    const [post, setPost] = useState(null)
    let {slug} = useParams();
    useEffect(() => {
        sanityClient.fetch(`*[_type == "post" && slug.current == "${slug}"][0]{
                 title,
                    "authorName": author->name,
                    publishedAt,
                    'countryNames': countries[]->name,
                    categories[]->{title, 'colourHex':colour.hex},
                    slug,
                    isFeatured,
                    mainImage{
                      asset->{
                            _id,
                            url
                        }
                    }
             }`)
            .then((data) => setPost(data))
            .catch(console.error);
    }, [slug]);
    return typeof (post) !== 'undefined' && post !== null ? (
        <Box>
            <Box className="landingPostImage"
                 style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(" + post?.mainImage?.asset?.url + ")"}}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={1} style={{height: "80%"}}>
                    <span style={{fontSize: "15px"}}>
                        <PostTags post={post} tagSize="large"/>
                    </span>
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
        </Box>
    ) : "";
};

export default Post;