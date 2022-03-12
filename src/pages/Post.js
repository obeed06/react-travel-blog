import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import sanityClient from "../client";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Post = () => {
    const [post, setPost] = useState(null)
    let {slug} = useParams();
    useEffect(() => {
        sanityClient.fetch(`*[_type == "post" && slug.current == "${slug}"][0]{
                 title,
                    "authorName": author->name,
                    publishedAt,
                    "country": countries[]->name[0],
                    "category": categories[]->{
                        "colourHex": colour.hex,
                        title
                    }[0],
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
            <Box className="landingTripImage"
                 style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(" + post?.mainImage?.asset?.url + ")"}}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <Typography vairant="h1" component="h2" className="title">
                        <div>{post?.title}</div>
                    </Typography>
                </Grid>
            </Box>
        </Box>
    ) : "";
};

export default Post;