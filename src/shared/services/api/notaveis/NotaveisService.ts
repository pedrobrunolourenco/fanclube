import { Enviroment } from "../../../environment";
import { Api } from "../axios-config";



export interface IListagemNotavel {
    id: number;
    nome: string;
    apelido: string;
    atividade: string;
    descricao: string;
}

export interface IDetalheNotavel {
    id: number;
    nome: string;
    apelido: string;
    atividade: string;
    descricao: string;
}

type TNotavelComTotalCount = {
    data: IListagemNotavel[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TNotavelComTotalCount | Error> => {
    try {
        const urlRelativa = `/notaveis?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
        const { data, headers } = await Api.get(urlRelativa);
        
        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
            };
        }

        return new Error('Erro ao listar notáveis.');
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao listar notáveis.');
    }
};

const getById = async (id: number): Promise<IDetalheNotavel| Error> => {
    try {
        const { data } = await Api.get(`/notaveis/${id}`);
        if (data) {
            return data;
        }
        return new Error('Erro ao consultar o notável.');
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar o notável.');
    }
};

const create = async (notavel: Omit<IDetalheNotavel, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post<IDetalheNotavel>('/notaveis/', notavel);
        if (data) {
            return data.id;
        }
        return new Error('Erro ao criar o notável.');
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o notável.');
    }
};

const updateById = async (id: number, notavel: IDetalheNotavel): Promise<void | Error> => {
    try {
        await Api.put(`/notaveis/${id}`, notavel);
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao alterar o notável.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/notaveis/${id}`);
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao excluir o notavel.');
    }
};

export const NotaveisService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};