import { useNavigate, useParams } from "react-router-dom";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { AdmiradoresService, IDetalheAdmirador } from "../../shared/services/api/admiradores/AdmiradoresService";

import { TextField, Box, Stack, Snackbar, Slide, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';


export const DetalheDeAdmiradores: React.FC = () => {
    const { id = 'novo' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");

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
                handleCloseDialog();
                setTipoMsg("success");
                setMsg("Admirador exccluído com sucesso!")
                setOpen(true);
        }
        });        
    };


    // aqui
    const { register, handleSubmit, formState, control, setValue } = useForm<IDetalheAdmirador>({
        defaultValues: {
            id: id === 'novo' ? undefined : Number(id),
            nomeCompleto: '',
            email: '',
            idade: 0,
            notavelId: 0
        }
    });

      


    const { errors } = formState;

    const onSubmit = (data: IDetalheAdmirador) => {
        handleSalvar(data);
    };

    const handleDelete = (id: number) => {
        setOpenDialoog({
            isOpen: true,
            id: id
        });
    }

    const handleSalvar = (data: IDetalheAdmirador) => {
        
        // incluir
        if(id === "novo")
        {
            AdmiradoresService.create(data).then(result => {
                if (result instanceof Error) {
                    setTipoMsg("error");
                    setMsg("Erro ao incluir um admirador")
                    setOpen(true);

                } else {
                    setTipoMsg("success");
                    setMsg("Admirador incluído com sucesso!")
                    setOpen(true);
                }
            });
        }

        // alterar
        if(id !== "novo")
        {

            AdmiradoresService.updateById(data.id, data).then(result => {
                if (result instanceof Error) {
                    setTipoMsg("error");
                    setMsg("Erro ao atualizar um admirador")
                    setOpen(true);

                } else {
                    setTipoMsg("success");
                    setMsg("Admirador atualizado com sucesso!")
                    setOpen(true);
                }
            });
        }

    }

    useEffect(() => {
        if (id !== "novo") {
            AdmiradoresService.getById(Number(id))
            .then((result) => {
                if (result instanceof Error) {
                    navigate('/admiradores');
                } else {
                    setNome(result.nomeCompleto);
                    atribuirForm(result);
                }
            });
        }
        else {
            limparForm();
        }
    }, [id]);



    const atribuirForm = (data: IDetalheAdmirador) => {
        setValue('id', data.id);
        setValue('nomeCompleto', data.nomeCompleto);
        setValue('email', data.email);
        setValue('idade', data.idade);
        setValue('notavelId', data.notavelId);
    }

    const limparForm= () => {
        setValue('id', 0);
        setValue('nomeCompleto', '');
        setValue('email', '');
        setValue('idade', 0);
        setValue('notavelId', 0);
    }

    return (
        <LayOutBaseDePagina 
            titulo={id === "novo" ? 'Novo Admirador' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo="Novo"
                    mostrarBotaoApagar={id !== "novo"}
                    aoClicarEmSalvar={handleSubmit(handleSalvar)}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmVoltar={() => navigate('/admiradores')}
                />
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2} width={600} margin={5}>
                    <TextField
                        autoComplete='off'
                        size="small"
                        label="Nome"
                        type="text"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register("nomeCompleto", {
                            required: "Nome é obrigatório",
                            minLength: {
                                value: 5,
                                message: "O nome deve ter pelo menos 5 letras"
                            }
                        })}
                        error={!!errors.nomeCompleto}
                        helperText={errors.nomeCompleto?.message}
                    />
                    <TextField
                        autoComplete='off'
                        size="small"
                        label="E-Mail"
                        type="email"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register("email", {
                            required: "E-Mail é obrigatório",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "E-Mail inválido"
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <Box width={300}>
                        <TextField
                            autoComplete='off'
                            size="small"
                            label="Idade"
                            type="number"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register("idade", {
                                required: "Idade é obrigatória",
                                min: {
                                    value: 10,
                                    message: "A idade deve ser maior que 10"
                                }
                            })}
                            error={!!errors.idade}
                            helperText={errors.idade?.message}
                        />
                    </Box>
                </Stack>
            </form>
            <DevTool control={control} />

            <Snackbar
                open={open}
                TransitionComponent={(props) => <Slide {...props} direction="left" />}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                autoHideDuration={6000}
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
                <Button onClick={handleCloseDialog} autoFocus>
                    Não
                </Button>
                </DialogActions>
            </Dialog>            



        </LayOutBaseDePagina>
    );
}

