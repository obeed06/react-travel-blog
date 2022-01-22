import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";

const About = () => {
    const containerRef = React.useRef(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "author"] {
        name,
        bio,
        "authorImage": image.asset->url
       }`).then((data) => setAuthor(data[0]))
            .catch(console.error);
    }, []);
    return (
        <Box>
            <div>
                <BlockContent blocks={author.bio} projectId="ho3u0oh3" dataset="production"/>
            </div>

        </Box>
    );
};

export default About;