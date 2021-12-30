import * as React from 'react';
import {useEffect, useState} from "react";
import {Link as Scroll} from "react-scroll";
import {makeStyles} from "@mui/styles";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles((theme) => ({
    colorText: {
        color: '#ff8100',
    },
    title: {
        color: '#fff',
        fontSize: '4.5rem',
        fontFamily: 'Nunito',
        textAlign: 'center',
    },
    goDown: {
        color: '#ff8100',
        fontSize: '4rem',
    },
}));

const Welcome = () => {
    const classes = useStyles();
    // const [checked, setChecked] = useState(false);
    // const containerRef = React.useRef(null);
    // useEffect(() => {
    //     setChecked(true);
    // }, []);

    return (
        // <Slide direction="up"
        //        in={checked}
        //        {...(checked ? {timeout: 1000} : {})}
        //        container={containerRef}
        // >
            <Box sx={{pt: 15}}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <h1 className={classes.title}>
                        <div>Welcome to</div>
                        <div>My <span className={classes.colorText}>Blog</span>.</div>
                    </h1>
                    <Scroll to="about-summary" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown}/>
                        </IconButton>
                    </Scroll>
                </Grid>
            </Box>
        // </Slide>
    );
};

export default Welcome;