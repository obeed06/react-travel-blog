import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import {makeStyles} from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
    mapPlaceholder: {
        opacity: "0.65",
        display: 'block',
        width: '100%',
        height: 'auto',
    },
    placeholderIcon: {
        fontSize: '11rem',
    },
    iconHovered: {
        transform: "scale3d(1.50, 1.50, 2)"
    },
    overlay: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        height: '100%',
        width: '100%',
        opacity: '0.8',
    },
}));

const ItineraryMap = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        raised:false,
    });
    return (
        <Box sx={{py: 5}}>
            <Container maxWidth="md">
                <Typography vairant="h1" component="h2" className="sectionHeader itineraryHeader">
                    Map.
                </Typography>
                <Box sx={{height: '500', width: '100%', position: 'relative'}}>
                    <img className={classes.mapPlaceholder}
                         src={process.env.PUBLIC_URL + '/assets/placeholder-travel-map.jpg'}
                         alt="travel map placeholder"/>
                    <div className={classes.overlay}
                         onMouseOver={()=>setState({ raised: true})}
                         onMouseOut={()=>setState({ raised:false })}>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: '100%' }}
                        >
                            <IconButton raised={state.raised} color="inherit" classes={{root: state.raised ? classes.iconHovered : ""}}>
                                <TravelExploreRoundedIcon className={classes.placeholderIcon}/>
                            </IconButton>
                        </Grid>

                    </div>
                    {/*<iframe*/}
                    {/*    src="https://www.travellerspoint.com/embed/map.cfm/#/embed/955332/?tiles=default&showguide=true&triponly"*/}
                    {/*    width="100%" height="500"/>*/}
                </Box>
            </Container>
        </Box>

    );
};

export default ItineraryMap;