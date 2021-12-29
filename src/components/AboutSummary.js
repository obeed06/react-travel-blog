import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    aboutBG: {
        backgroundColor: '#f8f8f8',
    },
    subHeading: {
        fontFamily: 'Nunito',
        textAlign: 'center',
    },
}));

const AboutSummary = () => {
    const classes = useStyles();

    return (
        <Box className={classes.aboutBG}  id="about-summary" sx={{py: 5 }}>
            <h1 className="sectionHeader myStoryHeader" >
                MY STORY.
            </h1>
            <Container maxWidth='sm'>
                <p className={classes.subHeading}>I'm David Obee, a software developer based in the UK. <br/>Welcome to my blog, this my space to practice my frontend skills and emerging technologies while documenting my solo travelling experiences.</p>
            </Container>
        </Box>
    );
};

export default AboutSummary;