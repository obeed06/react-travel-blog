import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    mapPlaceholder: {
        display: 'block',
        width: '100%',
        height: 'auto',
        borderRadius: "15px",
    },
    placeholderIcon: {
        fontSize: '8rem',
    },
    iconHovered: {
        transform: "scale3d(1.15, 1.15, 2)"
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

const MapPlaceholder = ({data, loadMap} ) => {
    const classes = useStyles();
    const [state, setState] = useState({
        raised:false,
    });
    return (
        <Box sx={{height: '500', width: '100%', position: 'relative'}} id="mapHolder">
            <img className={classes.mapPlaceholder}
                 src={data?.asset?.url}
                 loading="lazy"
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
                    <IconButton classes={{root: state.raised ? classes.iconHovered : ""}}
                                raised={state.raised.toString()}
                                color="inherit"
                                onClick={()=> loadMap()}
                    >
                        <TravelExploreRoundedIcon className={classes.placeholderIcon}/>
                    </IconButton>
                </Grid>

            </div>
        </Box>
    );
};

export default MapPlaceholder;