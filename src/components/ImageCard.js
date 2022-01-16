import React, {useState} from 'react';
import {makeStyles} from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grow from "@mui/material/Grow";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
    root: {
        transition: "transform 0.15s ease-in-out",
        minWidth: 250,
        background: 'rgba(0,0,0,0.5)',
    },
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 1)"
    },
    media: {
        height: 200,
    },
    title: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        color: '#fff',
    },
    desc: {
        fontFamily: 'Nunito',
        color: '#ddd',
    },
});

export default function ImageCard({ trip, checked, timeout }) {
    const classes = useStyles();
    const [state, setState] = useState({
        raised:false,
        shadow:1,
    });
    return (
        <Grow in={checked} {...(checked ? { timeout: 500*timeout } : {})}>
            <Box>
                <Card className={classes.root} classes={{root: state.raised ? classes.cardHovered : ""}}
                      onMouseOver={()=>setState({ raised: true, shadow:3})}
                      onMouseOut={()=>setState({ raised:false, shadow:1 })}
                      raised={state.raised} zdepth={state.shadow}>
                    <CardMedia
                        className={classes.media}
                        image={trip.thumbnail.asset.url}
                        alt={trip.thumbnail.alt}
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h1"
                            className={classes.title}
                        >
                            {trip.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.desc}
                        >
                            {trip.summary}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Grow>
    );
}