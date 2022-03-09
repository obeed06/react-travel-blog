import * as React from 'react';
import Typography from "@mui/material/Typography";
import {ParallaxBanner} from "react-scroll-parallax";

const WelcomeParallax = () => {

    const background = {
        image:process.env.PUBLIC_URL + '/assets/desert-background.jpg',
        translateY: [0, 50],
        opacity: [1, 0.3],
        scale: [1.05, 1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true
    };

    const headline = {
        translateY: [0, 30],
        scale: [1, 1.05, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className="inset center" style={{top: "-45vh"}}>
                <Typography vairant="h1" component="h2" className="white">
                    <div className="headline">WELCOME</div>
                </Typography>
            </div>
        )
    };

    const headline2 = {
        translateY: [0, 30],
        scale: [1, 1.05, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: (
            <div className="inset center">
                <Typography vairant="h1" component="h2" className="subHeadline brandColor">
                    WHERE'S OBEE
                </Typography>
            </div>
        )
    };

    const foreground = {
        image: process.env.PUBLIC_URL + '/assets/desert-foreground.webp',
        translateY: [0, 15],
        scale: [1, 1.1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true
    };

    const gradientOverlay = {
        opacity: [0, 1, "easeOutCubic"],
        shouldAlwaysCompleteAnimation: true,
        expanded: false,
        children: <div className="gradient inset" />
    };

    return (

            <ParallaxBanner
                layers={[background, headline, foreground, headline2, gradientOverlay]}
                className="full"
            />
    );
};

export default WelcomeParallax;