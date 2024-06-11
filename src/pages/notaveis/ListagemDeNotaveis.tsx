import { useNavigate, useSearchParams } from "react-router-dom"

import { FerramentasDaListagem } from "../../shared/components"
import { LayOutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Enviroment } from "../../shared/environment";
import { IListagemNotavel, NotaveisService } from "../../shared/services/api/notaveis/NotaveisService";


export const ListagemDeNotaveis: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();



    const {debounce} = useDebounce(3000, true);

    const [rows, setRows] = useState<IListagemNotavel[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);


    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const handleDelete = (id: number) => {
        NotaveisService.deleteById(id)
        .then(result => {
            if (result instanceof Error) {
            alert(result.message);
            } else {
            setRows(oldRows => [
                ...oldRows.filter(oldRow => oldRow.id !== id),
            ]);
            alert('Registro apagado com sucesso!');
            }
        });
    }

    useEffect( () => {
        setIsLoading(true);
        debounce(() => {
            NotaveisService.getAll(pagina, busca)
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
            titulo="Listagem de Notáveis"
            barraDeFerramentas={
                <FerramentasDaListagem 
                   textoBotaoNovo="Novo"
                   mostrarInputBusca={true}
                   textoDaBusca={busca}
                   aoClicarEmNovo={() => navigate('/notaveis/detalhe/novo') }
                   aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1'}, {replace: true}) }
                />
            }
         >

         <TableContainer component={Paper} variant="outlined" sx={ {m: 1, width: 'auto'} }>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ações</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Apelido</TableCell>
                        <TableCell>Atividade</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                   {
                      rows.map( row => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                    <Icon>delete</Icon>
                                </IconButton>
                                <IconButton  size="small" onClick={ () => navigate(`/notaveis/detalhe/${row.id}`)} >
                                    <Icon>edit</Icon>
                                </IconButton>
                            </TableCell>
                            <TableCell>{row.nome}</TableCell>
                            <TableCell>{row.apelido}</TableCell>
                            <TableCell>{row.atividade}</TableCell>
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