import { useNavigate, useParams } from "react-router-dom";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";

import { TextField, Box, Stack, Slide, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Paper } from "@mui/material";
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { NotaveisService, IDetalheNotavel } from "../../shared/services/api/notaveis/NotaveisService";
import React from "react";
import Snackbar from '@mui/material/Snackbar';

export const DetalheDeNotaveis: React.FC = () => {
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
        if (id === "novo") {
            limparForm();
            setOpen(false);
        }
        else
        {
            setOpen(false);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialoog({
            isOpen: false,
            id: 0
        });
    };

    const handleDeleteDialog = (id: number) => {
        NotaveisService.deleteById(id)
        .then(result => {
            if (result instanceof Error) {
                handleCloseDialog();
                setTipoMsg("error");
                setMsg("Erro ao excluir um notável")
                setOpen(true);
            } else {
                handleCloseDialog();
                setTipoMsg("success");
                setMsg("Notável exccluído com sucesso!")
                setOpen(true);
                navigate('/notaveis');
        }
        });        
    };


    const { register, handleSubmit, formState, control, setValue } = useForm<IDetalheNotavel>({
        defaultValues: {
            id: id === 'novo' ? undefined : Number(id),
            nome: '',
            apelido: '',
            atividade: '',
            descricao: ''
        }
    });


    const { errors } = formState;

    const onSubmit = (data: IDetalheNotavel) => {
        handleSalvar(data);
    };

    const handleDelete = (id: number) => {
        setOpenDialoog({
            isOpen: true,
            id: id
        });
    }



    const handleSalvar = (data: IDetalheNotavel) => {
        
        // incluir
        if(id === "novo")
        {
            NotaveisService.create(data).then(result => {
                if (result instanceof Error) {
                    setTipoMsg("error");
                    setMsg("Erro ao incluir um notável")
                    setOpen(true);

                } else {
                    setTipoMsg("success");
                    setMsg("Notável incluído com sucesso!")
                    setOpen(true);
                }
            });
        }

        // alterar
        if(id !== "novo")
        {

            NotaveisService.updateById(data.id, data).then(result => {
                if (result instanceof Error) {
                    setTipoMsg("error");
                    setMsg("Erro ao atualizar um notável")
                    setOpen(true);

                } else {
                    setTipoMsg("success");
                    setMsg("Notável atualizado com sucesso!")
                    setOpen(true);
                }
            });
        }

    }

    useEffect(() => {
        if (id !== "novo") {
            NotaveisService.getById(Number(id))
            .then((result) => {
                if (result instanceof Error) {
                    navigate('/notaveis');
                } else {
                    setNome(result.nome);
                    atribuirForm(result);
                }
            });
        }
        else {
            limparForm();
        }
    }, [id]);



    const atribuirForm = (data: IDetalheNotavel) => {
        setValue('id', data.id);
        setValue('nome', data.nome);
        setValue('apelido', data.apelido);
        setValue('atividade', data.atividade);
        setValue('descricao', data.descricao);
    }

    const limparForm= () => {
        setValue('id',0);
        setValue('nome', '');
        setValue('apelido', '');
        setValue('atividade', '');
        setValue('descricao', '');
    }

    return (


        
        <LayOutBaseDePagina 
            titulo={id === "novo" ? 'Novo Notável' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo="Novo"
                    mostrarBotaoApagar={id !== "novo"}
                    aoClicarEmSalvar={handleSubmit(handleSalvar)}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmVoltar={() => navigate('/notaveis')}
                />
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
               <Box 
                    marginX={1} 
                    paddingX={2} 
                    display="flex" 
                    gap={1} 
                    component={Paper}>

                <Stack spacing={2} width={600} margin={5}>
                    <TextField
                        autoComplete='off'
                        size="small"
                        label="Nome"
                        type="text"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register("nome", {
                            required: "Nome é obrigatório",
                            minLength: {
                                value: 5,
                                message: "O nome deve ter pelo menos 5 letras"
                            }
                        })}
                        error={!!errors.nome}
                        helperText={errors.nome?.message}
                    />

                    <TextField
                        autoComplete='off'
                        size="small"
                        label="Apelido"
                        type="text"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register("apelido", {
                            required: "Apelido é obrigatório",
                            minLength: {
                                value: 2,
                                message: "O apelido deve ter pelo menos 2 letras"
                            }
                        })}
                        error={!!errors.apelido}
                        helperText={errors.apelido?.message}
                    />

                    <TextField
                        autoComplete='off'
                        size="small"
                        label="Atividade"
                        type="text"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register("atividade", {
                            required: "Atividade é obrigatória",
                            minLength: {
                                value: 5,
                                message: "A atividade deve ter pelo menos 5 letras"
                            }
                        })}
                        error={!!errors.atividade}
                        helperText={errors.atividade?.message}
                    />

                    <TextField
                        autoComplete='off'
                        size="small"
                        label="Descrição"
                        type="text"
                        variant="outlined"
                        multiline
                        rows={3}
                        InputLabelProps={{ shrink: true }}
                        {...register("descricao", {
                            required: "Descrição é obrigatória",
                            minLength: {
                                value: 5,
                                message: "A descricao deve ter pelo menos 5 letras"
                            }
                        })}
                        error={!!errors.descricao}
                        helperText={errors.descricao?.message}
                    />
                    

                </Stack>

              </Box>  
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
                    {"Confirma a exclusão do registro?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Caso confirme, o NOTÁVEL será excluído definitivamente da base de dados!
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

