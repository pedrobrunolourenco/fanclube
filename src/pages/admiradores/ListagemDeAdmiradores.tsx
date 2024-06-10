import { useSearchParams } from "react-router-dom"

import { FerramentasDaListagem } from "../../shared/components"
import { LayOutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react";
import { AdmiradoresService, IListagemAdmirador } from "../../shared/services/api/admiradores/AdmiradoresService";
import { useDebounce } from "../../shared/hooks";
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Enviroment } from "../../shared/environment";


export const ListagemDeAdmiradores: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {debounce} = useDebounce(3000, true);

    const [rows, setRows] = useState<IListagemAdmirador[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');

    }, [searchParams]);


    const busca = useMemo(() => {
        return searchParams.get('busca') || '';

    }, [searchParams]);


    useEffect( () => {
        setIsLoading(true);
        debounce(() => {
            AdmiradoresService.getAll(pagina, busca)
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
    }, [busca, pagina]);

    return(
        <LayOutBaseDePagina 
            titulo="Listagem de Admiradores"
            barraDeFerramentas={
                <FerramentasDaListagem 
                   textoBotaoNovo="Novo"
                   mostrarInputBusca={true}
                   textoDaBusca={busca}
                   aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1'}, {replace: true}) }
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

                { totalCount === 0 && !isLoading &&
                    (
                        <caption>{Enviroment.LISTAGEM_VAZIA}</caption>
                    )
                }

                <TableFooter>
                    {isLoading && (
                    <TableRow>
                        <TableCell colSpan={3}>
                            <LinearProgress variant='indeterminate' />
                        </TableCell>
                    </TableRow>
                    )}

                    {(totalCount > 0 && totalCount > Enviroment.LIMITE_DE_LINHAS) && (
                    <TableRow>
                        <TableCell colSpan={3}>
                            <Pagination 
                                page={pagina}
                                count={ Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS) }
                                onChange={(e, newPage) =>setSearchParams({ busca, pagina: newPage.toString()}, {replace: true}) }
                            />
                        </TableCell>
                    </TableRow>
                    )}
               </TableFooter>

            </Table>
         </TableContainer>


        </LayOutBaseDePagina>
    )
}