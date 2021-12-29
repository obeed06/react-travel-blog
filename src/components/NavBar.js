import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';


const useStyles = makeStyles((theme) => ({

    appbar: {
        background: 'none',
        fontFamily: 'Nunito',
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto',
    },
    appbarTitle: {
        flexGrow: '1',
    },
    icon: {
        color: '#fff',
        fontSize: '2rem',
    },
    colorText: {
        color: '#ff8100',
    },
    container: {
        textAlign: 'center',
    },
    title: {
        color: '#fff',
        fontSize: '4.5rem',
    },
}));

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}



export default function NavBar(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar className={classes.appbar} elevation={0}>
                    <Toolbar className={classes.appbarWrapper}>
                        <h1 className={classes.appbarTitle}>
                            Where's<span className={classes.colorText}>Obee</span>?
                        </h1>
                        <IconButton>
                            <SortIcon className={classes.icon} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
}
