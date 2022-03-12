import React from 'react';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Moment from "moment";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import PostTags from "./PostTags";


export default function HeroPostCard({post}) {
    Moment.locale('en')
    return (
        <Link href={"/post/" + post.slug.current} key={post.slug.current} underline="none" style={{width: "100%"}}>
            <Paper elevation={3} className="mobilePostCard"
                   style={{height: "550px", backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 65%, black), url(" + post.mainImage.asset.url + ")"}}>
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
            </Paper>
        </Link>
    );
}