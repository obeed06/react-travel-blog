import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DarkModeIcon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/Brightness5';

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
                    <IconButton><FontAwesomeIcon icon={['fab', 'youtube']}/></IconButton>

                </Grid>
                <Grid item>
                    <p><IconButton><DarkModeIcon/></IconButton> Dark Mode</p>
                    <p><IconButton><LightModeIcon/></IconButton> Light Mode</p>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;