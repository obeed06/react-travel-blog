import React from 'react';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

export default function MobileCountryCard({post: country}) {
    return (
        <Link href={"/post/" + country.slug.current} key={country.slug.current} underline="none" style={{width: "100%"}}>
            <Paper elevation={0} square className="mobilePostCard"
                   style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 65%, black), url(" + country?.cBackground?.asset?.url + ")"}}>
                <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={1} style={{height: "80%"}}>
                    <div className="d-icon">
                        <div className="d-icon-bg" style={{backgroundImage: "url("+country?.cIcon?.asset?.url+")"}}></div>
                        <div className="d-title">{country.name}</div>
                    </div>

                </Stack>
            </Paper>
        </Link>
    );
}