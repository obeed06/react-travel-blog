import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

const Footer = () => {
    return (
        <Box className="siteFooter" sx={{ width: '100%' }}>
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
                    <IconButton><FontAwesomeIcon icon={['fab', 'github']}/></IconButton>
                    <IconButton><FontAwesomeIcon icon={['fab', 'instagram']}/></IconButton>
                    <IconButton><FontAwesomeIcon icon={['fab', 'facebook']}/></IconButton>
                    <IconButton><FontAwesomeIcon icon={['fab', 'linkedin']}/></IconButton>
                    <IconButton><FontAwesomeIcon icon={['fab', 'twitter']}/></IconButton>
                    <IconButton><FontAwesomeIcon icon={['fab', 'youtube']}/></IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;