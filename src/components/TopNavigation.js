import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import {makeStyles} from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const pages = [{
    title: 'Destinations',
    href: '/destinations'
},{
    title: 'Blog',
    href: '/posts'
},{
    title: 'About',
    href: '/about'
}];


const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Nunito',
    },
    appbarWrapper: {
        width: '90%',
        margin: '0 auto',
    },
    appbarTitle: {
        marginTop: 0,
        marginBottom: 0,
        flexGrow: '1',
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

export default function TopNavigation() {
    const classes = useStyles();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll>
                <AppBar className={classes.appbar} elevation={0} >
                    <Toolbar className={classes.appbarWrapper} disableGutters sx={{flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'center', md: 'flex-start' }}} >
                        <Link sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} href="/"><img style={{height: "65px", width: "65px"}} src={process.env.PUBLIC_URL + '/assets/logo-with-title.png'} alt="logo with title" /></Link>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'}, alignSelf: { xs: 'flex-start'} }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={"mobile-nav-"+page.title} onClick={handleCloseNavMenu} href={page.href}>
                                       <Link href={page.href} underline="none"><Typography textAlign="center">{page.title}</Typography></Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={"desktop-nav-"+page.title}
                                    onClick={handleCloseNavMenu}
                                    href={page.href}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.title}
                                </Button>
                            ))}
                        </Box>
                        <Link sx={{ display: { xs: 'flex', md: 'none' }, position: { xs: 'absolute', md: '' }, top: { xs: '25px', md: '' } }} href="/"><img style={{height: "65px", width: "65px"}} src={process.env.PUBLIC_URL + '/assets/logo-with-title.png'} alt="logo with title" /></Link>
                    </Toolbar>

                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
}
