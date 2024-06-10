import { useSearchParams } from "react-router-dom"

import { FerramentasDaListagem } from "../../shared/components"
import { LayOutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react";
import { AdmiradoresService, IListagemAdmirador } from "../../shared/services/api/admiradores/AdmiradoresService";
import { error } from "console";
import { useDebounce } from "../../shared/hooks";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export const ListagemDeAdmiradores: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {debounce} = useDebounce(3000, true);

    const [rows, setRows] = useState<IListagemAdmirador[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';

    }, [searchParams]);


    useEffect( () => {
        setIsLoading(true);
        debounce(() => {
            AdmiradoresService.getAll(1, busca)
            .then( (result) => {
                setIsLoading(false);
                if( result instanceof Error){
                    alert(result.message);
                } else {
                    console.log(result);
                    setTotalCount(result.totalCount);
                    setRows(result.data);
                }
            });
        });
    }, [busca]);

    return(
        <LayOutBaseDePagina 
            titulo="Listagem de Admiradores"
            barraDeFerramentas={
                <FerramentasDaListagem 
                   textoBotaoNovo="Novo"
                   mostrarInputBusca={true}
                   textoDaBusca={busca}
                   aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto}, {replace: true}) }
                />
            }
         >

         <TableContainer component={Paper} variant="outlined" sx={ {m: 1, width: 'auto'} }>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ações</TableCell>
                        <TableCell>Nome Completo</TableCell>
                        <TableCell>E-Mail</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                   {
                      rows.map( row => (
                        <TableRow key={row.id}>
                            <TableCell>Ações</TableCell>
                            <TableCell>{row.nomeCompleto}</TableCell>
                            <TableCell>{row.email}</TableCell>
                       </TableRow>
                      ))
                   }

                </TableBody>
                


            </Table>
         </TableContainer>


        </LayOutBaseDePagina>
    )
}