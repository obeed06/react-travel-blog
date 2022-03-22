import './TableOfContents.css'
import React, {useState} from 'react';
import useHeadingsData from "../../hook/useHeadingsData";
import useIntersectionObserver from "../../hook/useIntersectionObserver";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ListItemText from "@mui/material/ListItemText";

const TableOfContents = () => {
    const [activeId, setActiveId] = useState();
    const {nestedHeadings} = useHeadingsData();
    useIntersectionObserver(setActiveId);

    return (
        <List component="nav" className="postToC" aria-label="Table of contents" sx={{pt: 5}}>
            <Headings headings={nestedHeadings} activeId={activeId}/>
        </List>
    );
}

const Headings = ({headings, activeId}) => (
    <>
        {headings.map((heading, i) => (
            <>
                <ListItemButton key={heading.id} selected={heading.id === activeId} onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${heading.id}`).scrollIntoView({
                        behavior: "smooth"
                    });
                }}>
                    <ListItemText primary={heading.title}/>
                </ListItemButton>
                {heading.items.length > 0 && (
                    <List key={"sub-menu-"+i} component="div" disablePadding>
                        {heading.items.map((child) => (
                            <ListItemButton key={child.id} selected={child.id === activeId} onClick={(e) => {
                                e.preventDefault();
                                document.querySelector(`#${child.id}`).scrollIntoView({
                                    behavior: "smooth"
                                });
                            }} sx={{pl: 4}}>
                                <ListItemIcon>
                                    <SubdirectoryArrowRightIcon/>
                                </ListItemIcon>
                                <ListItemText primary={child.title}/>

                            </ListItemButton>
                        ))}
                    </List>
                )}
            </>
        ))}
    </>
);

export default TableOfContents;