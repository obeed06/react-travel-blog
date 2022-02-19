import React from 'react';
import {Card, CardContent, CardActionArea} from '@mui/material';

export default function CountryCard({country}) {
    console.log(country)
    return (
        <Card className="d-card" style={{backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url("+country?.cBackground?.asset?.url+")"}}>
            <CardActionArea href={"/countries/" + country.slug.current} key={country.slug.current}>
                <CardContent sx={{height: 300, width: 300}}>
                    <div className="d-icon">
                        <div className="d-icon-bg" style={{backgroundImage: "url("+country?.cIcon?.asset?.url+")"}}></div>
                        <div className="d-title">{country.name}</div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}