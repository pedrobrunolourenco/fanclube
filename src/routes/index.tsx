import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom"
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {

    const { toggleDrowerOpen  } = useDrawerContext()

    return (


      <Routes>
        <Route path="/pagina-inicial" element={<Button variant='contained' color='primary' onClick={toggleDrowerOpen}>Menu Lateral Toggle</Button>} /> 


        <Route path="*" element={<Navigate to="pagina-inicial" />} />
     </Routes>

    );

}
