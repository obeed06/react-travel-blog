import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#fff',
        fontSize: '4.5rem',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    smallTitle: {
        color: '#fff',
        fontSize: '2rem',
        fontFamily: 'Nunito',
        fontWeight: 'lighter',
        textAlign: 'center',
    },
    subHeading: {
        color: '#fff',
        fontFamily: 'Nunito',
        textAlign: 'center',
    },
}));

const About = () => {
    const classes = useStyles();
    const containerRef = React.useRef(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "author"]{
        name,
        bio
        }`)
            .then((data) => setAuthor(data[0]))
            .catch(console.error);
    }, []);

    if (!author) return <div>Loading...</div>
    return (
        <Box>
            <Box className="landingAbout" ref={containerRef}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <Typography vairant="h1" component="h2" className={classes.title}>
                        <div className={classes.smallTitle}>LEARN MORE</div>
                        ABOUT ME
                    </Typography>
                    <Container maxWidth='sm'>
                        <p className={classes.subHeading}>I'm David Obee, a software developer based in the UK. <br/>Welcome to my blog, this my space to practice my frontend skills and emerging technologies while documenting my solo travelling experiences.</p>
                    </Container>
                </Grid>
            </Box>
            <div>
                <BlockContent blocks={author.bio} projectId="ho3u0oh3" dataset="production"/>
            </div>

        </Box>
    );
};

export default About;