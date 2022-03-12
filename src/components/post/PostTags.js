import React from 'react';
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function PostTags({post}) {
    return (
        <Box className="postCardTags"
             sx={{
                 display: 'flex',
                 '& hr': {
                     mx: 0.5,
                     my: 0.35,
                     borderColor: "rgba(255, 255, 255, 0.5)"
                 },
             }}
        >
            {post?.category?.title ? <span
                style={post?.category?.colourHex ? {color: post?.category?.colourHex} : {}}>{post?.category?.title}</span> : ""}
            {post?.country && post?.category ?
                <Divider orientation="vertical" variant="inset" flexItem/> : ""}
            {post?.country ? <span>{post?.country}</span> : ""}
        </Box>
    );
}