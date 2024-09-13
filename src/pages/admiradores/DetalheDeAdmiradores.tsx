import { useNavigate, useParams } from "react-router-dom";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useMemo, useState } from "react";
import { AdmiradoresService, IDetalheAdmirador } from "../../shared/services/api/admiradores/AdmiradoresService";
import { TextField, Box, Stack, Snackbar, Slide, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Autocomplete, CircularProgress, Paper, Icon, Typography } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useDebounce } from "../../shared/hooks";
import { NotaveisService } from "../../shared/services/api/notaveis/NotaveisService";


type TAutoCompleteOption = {
    id: number;
    label: string;
};

export const DetalheDeAdmiradores: React.FC = () => {
    const { id = 'novo' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");

    const { debounce } = useDebounce();
    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState("");
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            NotaveisService.getAll(0,busca)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        // Trate o erro conforme necessário
                    } else {
                        setOpcoes(result.data.map(notavel => ({ id: notavel.id, label: notavel.nome })));
                    }
                });
        });
    }, [busca]);

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;
        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        return selectedOption || null;
    }, [selectedId, opcoes]);

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
                    setMsg("Admirador excluído com sucesso!")
                    setOpen(true);
                    navigate('/admiradores');
                }
            });
    };

    const { register, handleSubmit, formState, control, setValue } = useForm<IDetalheAdmirador>({
        defaultValues: {
            id: id === 'novo' ? undefined : Number(id),
            bairro: '',
            cep: '',
            cidade: '',
            complemento: '',
            email: '',
            endereco: '',
            idade: 0,
            nome: '',
            notavelId: 0 || undefined,
            uf: ''
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
    };

    const handleSalvar = (data: IDetalheAdmirador) => {
        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        data.notavelId = selectedOption?.id;
        
        // incluir
        if (id === "novo") {
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
        if (id !== "novo") {
            AdmiradoresService.updateById(data).then(result => {
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
    };

    useEffect(() => {
        if (id !== "novo") {
            AdmiradoresService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        navigate('/admiradores');
                    } else {
                        setNome(result.nome);
                        atribuirForm(result);
                    }
                });
        } else {
            limparForm();
        }
    }, [id]);

    const atribuirForm = (data: IDetalheAdmirador) => {
        setSelectedId(data.notavelId);
        setValue('id', data.id);
        setValue('nome', data.nome);
        setValue('email', data.email);
        setValue('idade', data.idade);
        setValue('notavelId', data.notavelId);
        setValue('endereco', data.endereco);
        setValue('bairro', data.bairro);
        setValue('cidade', data.cidade);
        setValue('uf', data.uf);
        setValue('cep', data.cep);
        setValue('complemento', data.complemento);

    };

    const limparForm = () => {
        setValue('id', 0);
        setValue('nome', '');
        setValue('email', '');
        setValue('idade', 0);
        setValue('notavelId', 0);
        setValue('endereco', '');
        setValue('bairro', '');
        setValue('cidade', '');
        setValue('uf', '');
        setValue('cep', '');
        setValue('complemento', '');

        setSelectedId(undefined);
    };

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
                        label="E-Mail"
                        type="email"
                        variant="outlined"
                        color="primary"
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

                    <Controller
                        name="notavelId"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                openText="Abrir"
                                closeText="Fechar"
                                noOptionsText="Sem Opções"
                                loadingText="Carregando..."
                                disablePortal={true}
                                value={autoCompleteSelectedOption}
                                loading={isLoading}
                                popupIcon={isLoading ? <CircularProgress size={28} /> : undefined}
                                onInputChange={(e, newValue) => setBusca(newValue)}
                                options={opcoes}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(event, newValue) => {
                                    setSelectedId(newValue?.id);
                                    field.onChange(newValue?.id || 0); 
                                    setValue('notavelId', newValue?.id || 0); 
                                }}

                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Fã Número 1"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        {...register("notavelId", {
                                            required: "Fã número 1 é obrigatório"
                                        })}
                                        error={!!errors.notavelId}
                                        helperText={errors.notavelId?.message}
            
                                    />
                                )}
                            />
                        )}
                    />


                    <Box width={600}>
                        <TextField
                            autoComplete='off'
                            size="small"
                            label="CEP"
                            type="text"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register("cep", {
                                required: "CEP é obrigatório",
                                minLength: {
                                    value: 5,
                                    message: "O CEP deve ter 5 dígitos"
                                }
                                })}
                            error={!!errors.cep}
                            helperText={errors.cep?.message}
                        />

                     <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        // onClick={}
                        endIcon={<Icon>email</Icon>}
                        sx={{ ml: 2 }}
                      >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Atualizar Endereço Pelo CEP
                        </Typography>
                     </Button>

                    </Box>

                    <TextField
                        autoComplete='off'
                        size="small"
                        label="Endereço"
                        type="text"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register("endereco", {
                            required: "Endereço é obrigatório",
                            minLength: {
                                value: 5,
                                message: "O endereço deve ter pelo menos 5 letras"
                            }
                        })}
                        error={!!errors.endereco}
                        helperText={errors.endereco?.message}
                    />

                     <TextField
                        autoComplete='off'
                        size="small"
                        label="Complemento"
                        type="text"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register("complemento", {
                        })}
                    />

                     <TextField
                        autoComplete='off'
                        size="small"
                        label="Bairro"
                        type="text"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register("bairro", {
                            required: "Bairro é obrigatório",
                            minLength: {
                                value: 2,
                                message: "O endereço deve ter pelo menos 2 letras"
                            }
                        })}
                        error={!!errors.bairro}
                        helperText={errors.bairro?.message}
                    />

                    <TextField
                        autoComplete='off'
                        size="small"
                        label="Cidade"
                        type="text"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        {...register("cidade", {
                            required: "Cidade é obrigatória",
                            minLength: {
                                value: 2,
                                message: "A cidade deve ter pelo menos 2 letras"
                            }
                        })}
                        error={!!errors.bairro}
                        helperText={errors.bairro?.message}
                    />

                    <Box width={200}>
                        <TextField
                            autoComplete='off'
                            size="small"
                            label="UF"
                            type="text"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            {...register("uf", {
                                required: "UF é obrigatória",
                                minLength: {
                                    value: 2,
                                    message: "A UF deve ter 2 dígitos"
                                }
                                })}
                            error={!!errors.uf}
                            helperText={errors.uf?.message}
                        />
                    </Box>


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
                    {"Confirma a exclusão do admirador?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Caso confirme, o ADMIRADOR será excluído definitivamente da base de dados!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDeleteDialog(openDialog.id)}>Sim</Button>
                    <Button onClick={handleCloseDialog} autoFocus>
                        Não
                    </Button>
                </DialogActions>
            </Dialog>
        </LayOutBaseDePagina>
    );
}
