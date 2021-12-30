import * as React from 'react';
import {Link as Scroll} from "react-scroll";
import {makeStyles} from "@mui/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#fff',
        fontSize: '4.5rem',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
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
                    <Typography vairant="h1" component="h2" className={classes.title}>
                        <div>Welcome to</div>
                        <div>My <span className="brandColor">Blog</span>.</div>
                    </Typography>
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