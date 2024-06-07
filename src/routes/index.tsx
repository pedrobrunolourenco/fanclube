import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom"
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const AppRoutes = () => {

    const { toggleDrawerOpen , setDrawerOptions } = useDrawerContext()

    useEffect( () => {
      setDrawerOptions([
        {
          icon: 'home',
          path: 'pagina-inicial',
          label: 'Página Inicial'
        },
        {
          icon: 'star',
          path: '/personagem',
          label: 'Personagem'
        },
        {
          icon: 'person',
          path: '/admirador',
          label: 'Admiradores'
        }
      ]);
    } , []);

    return (


      <Routes>
        <Route path="/pagina-inicial" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Menu Lateral Toggle</Button>} /> 


        <Route path="*" element={<Navigate to="pagina-inicial" />} />
     </Routes>

    );

}
