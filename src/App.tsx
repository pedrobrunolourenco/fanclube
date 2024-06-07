import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes";
import { ThemeProvider } from "@emotion/react";
import { Light } from "@mui/icons-material";
import { LightTheme } from "./shared/themes";


export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
       <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
     );
}

