import React from 'react';
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const RegionDivider = ({continents, selectedContinent, setSelectedContinent, setContinentQ}) => {
    const handleChange = (event, newValue) => {
        setSelectedContinent(newValue);
        if (newValue === "All")
            setContinentQ("");
        else
            setContinentQ(newValue);
    };
    return (
        <>
            <Tabs
                value={selectedContinent}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab key="all-continents" label="All" value="All"/>
                {
                    continents && continents.map((c, i) => <Tab key={c?.name+"-filter"} value={c?.name} label={c?.name}/>)
                }
            </Tabs>



            <Divider/>
        </>
    )
};


export default RegionDivider;