import {createTheme} from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

export const LightTheme = createTheme({

    palette:{
        primary:{
            main: "#00008B" ,
            dark: "#0000CD",
            light: "#0000FF",
            contrastText: '#ffffff',
        },
        secondary:{
            main: cyan[500] ,
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff',
        },
        background:{
            default: '#f7f6f3',
            paper: '#ffffff',
        }
    }

});

