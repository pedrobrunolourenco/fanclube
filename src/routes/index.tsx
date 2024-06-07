import { Routes, Route, Navigate } from "react-router-dom"
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { DashBoard } from "../pages";

export const AppRoutes = () => {

    const { setDrawerOptions } = useDrawerContext()

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
        <Route path="/pagina-inicial" element={<DashBoard />} /> 


        <Route path="*" element={<Navigate to="pagina-inicial" />} />
     </Routes>

    );

}
