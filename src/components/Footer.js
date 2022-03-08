import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

const Footer = () => {
    return (
        <Box className="siteFooter" sx={{ width: '100%', height: '75vh' }}>
            <Grid container direction="row" justifyContent="space-around" >
                <Grid item>
                    <h6>ABOUT</h6>
                </Grid>
                <Grid item>
                    <h6>QUICK LINKS</h6>
                </Grid>
            </Grid>
            <Divider/>
            <Grid container direction="row" justifyContent="space-around" >
                <Grid item>
                    <IconButton href="https://github.com/obeed06" target="_blank"><FontAwesomeIcon icon={['fab', 'github']}/></IconButton>
                    <IconButton href="https://www.instagram.com/wheresobee/" target="_blank"><FontAwesomeIcon icon={['fab', 'instagram']}/></IconButton>
                    <IconButton href="https://www.facebook.com/david.obee" target="_blank"><FontAwesomeIcon icon={['fab', 'facebook']}/></IconButton>
                    <IconButton href="https://www.linkedin.com/in/david-obee-49153941" target="_blank"><FontAwesomeIcon icon={['fab', 'linkedin']}/></IconButton>
                    <IconButton href="https://twitter.com/davidobee" target="_blank"><FontAwesomeIcon icon={['fab', 'twitter']}/></IconButton>
                    <IconButton href="https://www.youtube.com/channel/UCrG29-sOLEvxYbNqTtuJhrg" target="_blank"><FontAwesomeIcon icon={['fab', 'youtube']}/></IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;