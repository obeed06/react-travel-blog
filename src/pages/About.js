import './About.css';
import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Moment from "moment";

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
    Moment.locale('en')
    const classes = useStyles();
    const containerRef = React.useRef(null);
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`{
            "author": *[_type == "author"][0]{
                name,
                bio
            },
            "countryCount": count(*[_type == "country"]),
            "postCount": count(*[_type == "post"]),
            "earliestTrip": *[_type == "trip"]| order(tripDate asc)[0] {tripDate}
        }`)
            .then((data) => setAboutData(data))
            .catch(console.error);
    }, []);

    return (
        <Box>
            <Box className="landingAbout" ref={containerRef}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <Typography vairant="h1" component="h2" className={classes.title}>
                        <div className={classes.smallTitle}>LEARN MORE</div>
                        ABOUT ME
                    </Typography>
                    <Container maxWidth='sm'>
                        <p className={classes.subHeading}>I'm David Obee, a software developer based in the UK. <br/>Welcome
                            to my blog, this my space to practice my frontend skills and emerging technologies while
                            documenting my solo travelling experiences.</p>
                    </Container>
                </Grid>
            </Box>
            {aboutData ? (
                <Container maxWidth='md'>
                    <Stack direction={{xs: 'column', sm: 'row'}}
                           divider={<Divider style={{marginLeft: "5px", marginRight: "5px"}} orientation="vertical"
                                             flexItem/>}
                           sx={{alignItems: "center", justifyContent: "space-evenly"}}>

                        <div>
                            <Typography className="statTitle" vairant="h5" component="h5">
                                Countries Visited:
                            </Typography>
                            <em className="statNumber">{aboutData?.countryCount}+</em>
                        </div>
                        <div>
                            <Typography className="statTitle" vairant="h5" component="h5">
                                Years Travelled:
                            </Typography>
                            <em className="statNumber">{new Date().getFullYear() - Moment(aboutData?.earliestTrip?.tripDate).year()}+</em>
                        </div>
                        <div>
                            <Typography className="statTitle" vairant="h5" component="h5">
                                Posts Written:
                            </Typography>
                            <em className="statNumber">{aboutData?.postCount}</em>
                        </div>
                    </Stack>

                    <div>
                        <BlockContent blocks={aboutData?.author?.bio} projectId="ho3u0oh3" dataset="production"/>
                    </div>
                </Container>
            ) : (
                ""
            )}
        </Box>
    );
};

export default About;