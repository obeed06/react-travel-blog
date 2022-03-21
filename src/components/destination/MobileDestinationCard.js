import React from 'react';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

export default function MobileDestinationCard({post: destination}) {
    return (
        <Link href={"/destination/" + destination.slug.current} key={destination.slug.current} underline="none" style={{width: "100%"}}>
            <Paper elevation={0} square className="mobilePostCard"
                   style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 65%, black), url(" + destination?.bgImage?.asset?.url + ")"}}>
                <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={1} style={{height: "80%"}}>
                    <div className="d-icon">
                        <div className="d-icon-bg" style={{backgroundImage: "url("+destination?.icon?.asset?.url+")"}}></div>
                        <div className="d-card-title">{destination.name}</div>
                    </div>

                </Stack>
            </Paper>
        </Link>
    );
}