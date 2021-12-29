import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {Link as Scroll} from "react-scroll";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Slide from "@material-ui/core/Slide";
import {makeStyles} from "@material-ui/core/styles";

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
    const [checked, setChecked] = useState(false);
    const containerRef = React.useRef(null);
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <Slide direction="up"
               in={checked}
               {...(checked ? {timeout: 1000} : {})}
               container={containerRef}
        >
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
        </Slide>
    );
};

export default Welcome;