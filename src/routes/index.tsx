import { Routes, Route, Navigate } from "react-router-dom"
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { DashBoard, ListagemDeAdmiradores } from "../pages";

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
          path: '/notaveis',
          label: 'Notáveis'
        },
        {
          icon: 'person',
          path: '/admiradores',
          label: 'Admiradores'
        }
      ]);
    } , []);

    return (


      <Routes>
        <Route path="/pagina-inicial" element={<DashBoard />} /> 
        <Route path="/admiradores" element={<ListagemDeAdmiradores />} /> 
        <Route path="/admiradores/detalhe/:id" element={<p>DETALHE ADMIRADORES</p>} /> 

        <Route path="*" element={<Navigate to="pagina-inicial" />} />
     </Routes>

    );

}
