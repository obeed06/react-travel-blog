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
    landingAbout: {
        "&::after": {
            backgroundColor: theme.palette.background.default,
        }
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
            "destinationCount": count(*[_type == "destination" && isCountry == true]),
            "postCount": count(*[_type == "post"]),
            "earliestTrip": *[_type == "trip"]| order(tripDate asc)[0] {tripDate}
        }`)
            .then((data) => setAboutData(data))
            .catch(console.error);
    }, []);

    return (
        <Box>
            <Box className={[classes.landingAbout, "landingAbout"]}  ref={containerRef}>
                <Grid sx={{height: "100%"}} container direction="column" justifyContent="center" alignItems="center">
                    <Typography vairant="h1" component="h2" className="aboutHeading">
                        <div className="aboutSubHeading">learn more</div>
                        <Divider style={{borderColor: "rgba(255, 255, 255, 0.15)", width: "75%", marginLeft: "12.5%"}}/>
                        about me
                    </Typography>
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
                            <em className="statNumber">{aboutData?.destinationCount}+</em>
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

                    <Box sx={{py: 5}}>
                        <BlockContent blocks={aboutData?.author?.bio} projectId="ho3u0oh3" dataset="production"/>
                    </Box>
                </Container>
            ) : (
                ""
            )}
        </Box>
    );
};

export default About;