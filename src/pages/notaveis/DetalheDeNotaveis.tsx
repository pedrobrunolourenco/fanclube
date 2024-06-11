import { useNavigate, useParams } from "react-router-dom";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";

import { TextField, Box, Stack } from "@mui/material";
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { NotaveisService, IDetalheNotavel } from "../../shared/services/api/notaveis/NotaveisService";
import React from "react";


type FormValues = {
   id: number;
   nome: string;
   apelido: string;
   atividade: string;
   descricao: string;
}

export const DetalheDeNotaveis: React.FC = () => {
    const { id = 'novo' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");

    const { register, handleSubmit, formState, control, setValue } = useForm<FormValues>({
        defaultValues: {
            id: id === 'novo' ? undefined : Number(id),
            nome: '',
            apelido: '',
            atividade: '',
            descricao: ''
        }
    });
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        handleSalvar(data);
    };

    const handleDelete = (id: number) => {
        NotaveisService.deleteById(id)
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
        // NotaveisService.save(data).then(result => {
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
            NotaveisService.getById(Number(id))
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
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
        setValue('nome', data.nome);
        setValue('apelido', data.apelido);
        setValue('atividade', data.atividade);
        setValue('descricao', data.desricao);
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
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoApagar={id !== "novo"}
                    mostrarBotaoNovo={id !== "novo"}
                    aoClicarEmSalvar={handleSubmit(handleSalvar)}
                    aoClicarEmSalvarEFechar={() => {}}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/notaveis/detalhe/novo')}
                    aoClicarEmVoltar={() => navigate('/notaveis')}
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
            </form>
            <DevTool control={control} />
        </LayOutBaseDePagina>
    );
}

