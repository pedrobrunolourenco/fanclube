import { useNavigate, useParams } from "react-router-dom";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { ChangeEvent, useEffect, useState } from "react";

import { TextField, Box, Stack, Slide, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Paper, Icon, Typography, Card, CardMedia } from "@mui/material";
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { NotaveisService, IDetalheNotavel } from "../../shared/services/api/notaveis/NotaveisService";
import React from "react";
import Snackbar from '@mui/material/Snackbar';
import { ExternasService } from "../../shared/services/api/externas/ExternasService";

export const DetalheDeNotaveis: React.FC = () => {
    const { id = 'novo' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");

    const [imagemUrl, setImagemUrl] = useState('');
    
    const handleImagemChange = (event: ChangeEvent<HTMLInputElement>) => {
        setImagemUrl(event.target.value);
    };

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialoog] = useState({
        isOpen: false,
        id: 0
    });

    const [msg, setMsg] = useState("");
    const [tipoMsg, setTipoMsg] = useState<"error" | "success" | "warning">("warning");
    const [limpa, setLimpa] = useState(false);


    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        if (id === "novo") {
            if( limpa ) limparForm();
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


    const { register, handleSubmit, formState, control, setValue, getValues } = useForm<IDetalheNotavel>({
        defaultValues: {
            id: id === 'novo' ? undefined : Number(id),
            nome: '',
            apelido: '',
            atividade: '',
            descricao: '',
            imagem: ''
        }
    });


    const { errors } = formState;



    const buscaNotavel = (apelido: string) => {
        setOpen(false);
        setLimpa(false);
    
        if (apelido.length === 0) {
            setMsg("Informe o apelido");
            setTipoMsg("error");
            setOpen(true);
            return;
        }
    
        ExternasService.getByWikPedia(apelido)
            .then(data => {
                if (data instanceof Error || !data) {
                    setMsg("Notável não encontrado");
                    setTipoMsg("error");
                } else {
                    setValue('atividade', data.atividade);
                    setValue('descricao', data.descricao);
                    setValue('imagem', data.imagem);
                    setImagemUrl(data.imagem || "");
                    setMsg("Notável encontrado com sucesso");
                    setTipoMsg("success");
                }
            })
            .catch(() => {
                setMsg("Erro ao buscar dados do notável");
                setTipoMsg("error");
            })
            .finally(() => {
                setOpen(true);  
            });
    };


    const handleBuscarNotavel = () => {
        setOpen(false);
        const apelido = getValues('apelido'); 
        buscaNotavel(apelido); 
    };    

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
                    setLimpa(false);
                    setTipoMsg("error");
                    setMsg("Erro ao incluir um notável")
                    setOpen(true);

                } else {
                    setLimpa(true);
                    setTipoMsg("success");
                    setMsg("Notável incluído com sucesso!")
                    setOpen(true);
                }
            });
        }

        // alterar
        if(id !== "novo")
        {
            NotaveisService.updateById(data).then(result => {
                if (result instanceof Error) {
                    setTipoMsg("error");
                    setMsg("Erro ao atualizar um notável")
                    setOpen(true);

                } else {
                    setTipoMsg("success");
                    setNome(result.nome);
                    setImagemUrl(result.imagem || ""); // Atualiza imagem ao buscar o notável
                    setMsg("Notável atualizado com sucesso!")
                    setOpen(true);
                }
            });
        }

    }

    useEffect(() => {
        setOpen(false);
        if (id !== "novo") {
            setLimpa(false);
            NotaveisService.getById(Number(id))
            .then((result) => {
                if (result instanceof Error) {
                    navigate('/notaveis');
                } else {
                    setImagemUrl(result.imagem || ""); 
                    setNome(result.nome);
                    atribuirForm(result);
                }
            });
        }
        else {
            setLimpa(true);
            limparForm();
        }
    }, [id]);



    const atribuirForm = (data: IDetalheNotavel) => {
        setValue('id', data.id);
        setValue('nome', data.nome);
        setValue('apelido', data.apelido);
        setValue('atividade', data.atividade);
        setValue('descricao', data.descricao);
        setValue('imagem', data.imagem);
        setImagemUrl(data.imagem || ""); 

    }

    const limparForm= () => {
        setValue('id',0);
        setValue('nome', '');
        setValue('apelido', '');
        setValue('atividade', '');
        setValue('descricao', '');
        setValue('imagem', '');
        setImagemUrl(""); 

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


                    <Box width={600}>
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

                            <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                type="button"
                                onClick={handleBuscarNotavel}
                                endIcon={<Icon>star</Icon>}
                                sx={{ ml: 2 }}
                            >
                                <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                                    Buscar Notável
                                </Typography>
                            </Button>


                    </Box>

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
                        rows={10}
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
                    
                        {/* Campo oculto Imagem */}
                        <TextField
                            autoComplete='off'
                            size="small"
                            label="Imagem"
                            type="text"
                            variant="outlined"
                            multiline
                            InputLabelProps={{ shrink: true }}
                            style={{ display: 'none' }} // Campo invisível
                            {...register("imagem", {
                                onChange: handleImagemChange, // Atualiza o estado ao mudar o valor
                            })}
                        />

                </Stack>

                    <Card sx={{ maxWidth: 300, maxHeight:300}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={imagemUrl || 'https://via.placeholder.com/300'} 
                            alt="Imagem do notável"
                        />
                    </Card>                

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

