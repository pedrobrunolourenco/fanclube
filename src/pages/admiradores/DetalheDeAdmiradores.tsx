import { useNavigate, useParams } from "react-router-dom";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { AdmiradoresService, IDetalheAdmirador } from "../../shared/services/api/admiradores/AdmiradoresService";

import { TextField, Box, Stack } from "@mui/material";
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
   id: number;
   nomeCompleto: string;
   email: string;
   idade: number;
   notavelId: number;
}

export const DetalheDeAdmiradores: React.FC = () => {
    const { id = 'novo' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");

    const { register, handleSubmit, formState, control, setValue } = useForm<FormValues>({
        defaultValues: {
            id: id === 'novo' ? undefined : Number(id),
            nomeCompleto: '',
            email: '',
            idade: 0,
            notavelId: 0,
        }
    });
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        handleSalvar(data);
    };

    const handleDelete = (id: number) => {
        AdmiradoresService.deleteById(id)
        .then(result => {
            if (result instanceof Error) {
                alert(result.message);
            } else {
                alert('Registro apagado com sucesso!');
                navigate('/admiradores');
            }
        });
    }

    const handleSalvar = (data: FormValues) => {
        
        console.log('Dados do formulário:', data);

        // incluir
        if(id === "novo")
        {

        }

        // alterar
        if(id !== "novo")
        {

        }
    


        // Lógica para salvar os dados
        // AdmiradoresService.save(data).then(result => {
        //     if (result instanceof Error) {
        //         alert(result.message);
        //     } else {
        //         alert('Registro salvo com sucesso!');
        //         navigate('/admiradores');
        //     }
        // });
    }

    useEffect(() => {
        if (id !== "novo") {
            AdmiradoresService.getById(Number(id))
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
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
        setValue('nomeCompleto', data.nomeCompleto);
        setValue('email', data.email);
        setValue('idade', data.idade);
        setValue('notavelId', data.notavelId);
    }

    const limparForm= () => {
        setValue('id',0);
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
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoApagar={id !== "novo"}
                    mostrarBotaoNovo={id !== "novo"}
                    aoClicarEmSalvar={handleSubmit(handleSalvar)}
                    aoClicarEmSalvarEFechar={() => {}}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/admiradores/detalhe/novo')}
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
        </LayOutBaseDePagina>
    );
}

