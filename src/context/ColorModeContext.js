import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {deepOrange, pink} from "@mui/material/colors";

const initialColorMode = localStorage.getItem('colorMode');

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

export const ColorModeContextProvider = ({app}) => {
    const [mode, setMode] = React.useState(initialColorMode ? initialColorMode : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    localStorage.setItem('colorMode', prevMode === "light" ? "dark" : "light")
                    return (prevMode === "light" ? "dark" : "light");
                });
            },
            mode,
        }),
        [mode]
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    primary:  deepOrange,
                    secondary: pink,
                    mode,
                },
                components: {
                    MuiButton: {
                        variants: [
                            {
                                props: { variant: "underlined"},
                                style: {
                                    whiteSpace: "nowrap",
                                    borderRadius: "0",
                                    borderBottom: "2px solid transparent",
                                    ":hover": {
                                        borderBottom: "2px solid " + deepOrange["500"]
                                    }
                                },

                            }
                        ]
                    }
                }
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {app}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export const useColorMode = () => React.useContext(ColorModeContext);

