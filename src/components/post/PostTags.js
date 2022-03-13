import React from 'react';
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function PostTags({post, tagSize = "x-small"}) {
    let categories = post?.categories
    let countryNames = post?.countryNames
    if (tagSize === "x-small" || tagSize === "small") {
        if (Array.isArray(categories))
            categories = categories.slice(0, 1)
        if (Array.isArray(countryNames))
            countryNames = countryNames.slice(0, 1)
    }
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
            {categories && categories.map((category, i) =>
                    (category ? (
                        <React.Fragment>
                            <span key={"tag-category-"+category.title+i}
                                style={category?.colourHex ? {color: category?.colourHex, fontSize: tagSize} : {fontSize: tagSize}}>
                                {category?.title}
                            </span>
                            {i === categories.length-1 ? "" : divider("tag-category-divider"+category.title+i)}
                        </React.Fragment>
                    ) : (
                        ""
                    ))
            )}
            {categories && categories.length && countryNames && countryNames.length ? divider("tag-divider") : ""}
            {countryNames && countryNames.map((countryName, i) =>
                    (countryName ? (
                        <React.Fragment>
                            <span style={{fontSize: tagSize}}>
                                {countryName}
                            </span>
                            {i === countryName.length-1 ? "" : divider("tag-country-divider"+countryName+i)}
                        </React.Fragment>
                    ) : (
                        ""
                    ))
            )}
        </Box>
    );
}
function divider(key) {
    return <Divider key={Math.random()} orientation="vertical" variant="inset" flexItem/>
}