import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import { AdmiradoresService, IListagemAdmirador } from "../../shared/services/api/admiradores/AdmiradoresService";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Slide, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Enviroment } from "../../shared/environment";

export const ListagemDeAdmiradores: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialoog] = useState({
        isOpen: false,
        id: 0
    });

    const [msg, setMsg] = useState("");
    const [tipoMsg, setTipoMsg] = useState<any>("warning");

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        navigate('/admiradores');
        setOpen(false);
    };

    const handleCloseDialog = () => {
        setOpenDialoog({
            isOpen: false,
            id: 0
        });
    };

    const handleDeleteDialog = (id: number) => {
        AdmiradoresService.deleteById(id)
        .then(result => {
            if (result instanceof Error) {
                handleCloseDialog();
                setTipoMsg("error");
                setMsg("Erro ao excluir um admirador")
                setOpen(true);
            } else {
                setRows(oldRows => [
                    ...oldRows.filter(oldRow => oldRow.id !== id),
                ]);

                handleCloseDialog();
                setTipoMsg("success");
                setMsg("Admirador exccluído com sucesso!")
                setOpen(true);
        }
        });        
    };

    const [rows, setRows] = useState<IListagemAdmirador[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const handleDelete = (id: number) => {
        setOpenDialoog({
            isOpen: true,
            id: id
        });
    };

    useEffect(() => {
        setIsLoading(true);
        AdmiradoresService.getAll(pagina,busca)
          .then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              
              if (Array.isArray(result.data)) {
                setTotalCount(result.totalCount || 0);
                setRows(result.data);  
              } else {
                console.error("Dados inesperados: ", result);
              }
            }
          });
      }, [busca, pagina]);

    return (
        <LayOutBaseDePagina
            titulo="Listagem de Admiradores"
            barraDeFerramentas={
                <FerramentasDaListagem
                    placeHolder="Pesquisar por Nome"
                    textoBotaoNovo="Novo"
                    mostrarInputBusca={true}
                    textoDaBusca={busca}
                    aoClicarEmNovo={() => navigate('/admiradores/detalhe/novo')}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>E-Mail</TableCell>
                            <TableCell>Idade</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton size="small" onClick={() => navigate(`/admiradores/detalhe/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.idade}</TableCell>
                                <TableCell>{row.uf}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Enviroment.LISTAGEM_VAZIA}</caption>
                    )}

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
                                        count={Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS)}
                                        onChange={(e, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>

            <Snackbar
                open={open}
                TransitionComponent={(props) => <Slide {...props} direction="left" />}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                autoHideDuration={3000}
            >
                <Alert onClose={handleClose} severity={tipoMsg} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>

            <Dialog
                open={openDialog.isOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    {"Confirma a exclusão do admirador?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Caso confirme, o ADMIRADOR será excluído definitivamente da base de dados!
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={(id) => handleDeleteDialog(openDialog.id)}>Sim</Button>
                <Button onClick={handleCloseDialog} autoFocus>Não</Button>
                </DialogActions>
            </Dialog>            


        </LayOutBaseDePagina>
    );
}
