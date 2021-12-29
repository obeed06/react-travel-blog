import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import PlacesToVisit from "../components/PlacesToVisit";
import {makeStyles} from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link as Scroll} from 'react-scroll';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundColor: `url(${process.env.PUBLIC_URL + '/assets/bg-hero-sand.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    welcome: {
        minHeight: '100vh',
    },
    colorText: {
        color: '#5AFF3D',
    },
    title: {
        color: '#fff',
        fontSize: '4.5rem',
        fontFamily: 'Nunito',
        textAlign: 'center',
    },
    goDown: {
        color: '#5AFF3D',
        fontSize: '4rem',
    },
}));

const Home = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const containerRef = React.useRef(null);
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <div className={classes.root}>
            <NavBar/>
            <Box sx={{ height: '100%' }}>
                <Slide direction="up"
                       in={checked}
                       {...(checked ? {timeout: 1000} : {})}
                       container={containerRef}
                >
                    <Box sx={{pt: 15}}>
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <h1 className={classes.title}>
                                <div>Welcome to</div>
                                <div>My<span className={classes.colorText}>Blog</span>.</div>
                            </h1>
                            <Scroll to="place-to-visit" smooth={true}>
                                <IconButton>
                                    <ExpandMoreIcon className={classes.goDown}/>
                                </IconButton>
                            </Scroll>
                        </Grid>
                    </Box>
                </Slide>
            </Box>
            <PlacesToVisit />
        </div>
    );
};

export default Home;