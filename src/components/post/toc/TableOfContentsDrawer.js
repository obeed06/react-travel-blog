import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ListTableOfContents from "./ListTableOfContents";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {styled} from "@mui/material/styles";
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";

const drawerWidth = 240;
const drawerBleeding = 56;

styled('div')(({theme}) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));
const StyledBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));


const TableOfContentsDrawer = (props) => {
    const nestedHeadings = props.nestedHeadings
    const container = window !== undefined ? () => window.document.body : undefined;
    const [mOpen, setMOpen] = React.useState(false);

    const toggleMobileDrawer = (newOpen) => () => {
        setMOpen(newOpen);
    };

    return (
        <>
            {nestedHeadings && nestedHeadings.length > 0 && (
                <>
                    {/*Mobile*/}
                    <span className="desktop-post-toc">
                        <SwipeableDrawer
                            anchor="bottom"
                            open={mOpen}
                            onClose={toggleMobileDrawer(false)}
                            onOpen={toggleMobileDrawer(true)}
                            swipeAreaWidth={drawerBleeding}
                            disableSwipeToOpen={false}
                            sx={{
                                display: {md: 'none'},
                                '& .MuiPaper-root': {height: `calc(50% - ${drawerBleeding}px)`, overflow: 'visible',},

                            }}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            <StyledBox
                                sx={{
                                    position: 'absolute',
                                    top: -drawerBleeding,
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                    visibility: 'visible',
                                    right: 0,
                                    left: 0,
                                }}
                            >
                                <Puller/>
                                <Typography sx={{p: 2, color: 'text.secondary'}}>Table of Contents</Typography>
                            </StyledBox>
                            <StyledBox
                                sx={{
                                    px: 2,
                                    pb: 2,
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                <ListTableOfContents nestedHeadings={nestedHeadings}/>
                            </StyledBox>
                        </SwipeableDrawer>
                    </span>


                    {/*Desktop*/}
                    <Drawer
                        container={container}
                        anchor="right"
                        variant="permanent"
                        sx={{
                            display: {xs: 'none', md: 'block'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                        open
                    >
                        <Box role="presentation">
                            <Toolbar/>
                            <Divider/>
                            <ListTableOfContents nestedHeadings={nestedHeadings}/>
                        </Box>
                    </Drawer>
                </>
            )}
        </>
    );
}

export default TableOfContentsDrawer;