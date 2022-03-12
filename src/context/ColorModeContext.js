import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {deepOrange, pink} from "@mui/material/colors";


export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    },
    mode: "light",
});

export const ColorModeContextProvider = ({app}) => {
    const [mode, setMode] = React.useState("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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

