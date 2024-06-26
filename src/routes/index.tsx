import { Routes, Route, Navigate } from "react-router-dom"
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { DashBoard, ListagemDeAdmiradores, DetalheDeAdmiradores } from "../pages";
import { ListagemDeNotaveis } from "../pages/notaveis/ListagemDeNotaveis";
import { DetalheDeNotaveis } from "../pages/notaveis/DetalheDeNotaveis";

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
        <Route path="/admiradores/detalhe/:id" element={<DetalheDeAdmiradores />} /> 

        <Route path="/notaveis" element={<ListagemDeNotaveis />} /> 
        <Route path="/notaveis/detalhe/:id" element={<DetalheDeNotaveis />} /> 

        <Route path="*" element={<Navigate to="pagina-inicial" />} />
     </Routes>

    );

}
