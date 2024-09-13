import axios from "axios";
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

export interface ICreateNotavel {
    nome: string;
    apelido: string;
    atividade: string;
    descricao: string;
}


export interface IRequestGet {
    offset: string
    limit: string
}


type TNotavelComTotalCount = {
    data: IListagemNotavel[];
    totalCount: number;
}

export interface IRetornoNotavel {
    apelido: string;
    atividade: string;
    descricao: string;
    id: number;
    nome: string;
    sucesso: boolean;
}



const urlBase = Enviroment.URL_NOTAVEL;


const updateById = async (notavel: IDetalheNotavel): Promise<IDetalheNotavel> => {
    try {
        const urlRelativa = `${urlBase}/update`;

        const response = await Api.put<IDetalheNotavel>(
            urlRelativa, 
            notavel,
            { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
        );

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Resposta vazia da API ao alterar o notável.');
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Erro na requisição:', error.response.data);
            throw new Error(`Erro ao alterar o notável: ${error.response.data}`);
        } else {
            throw new Error((error as Error).message || 'Erro ao remover o notável.');
        }
    }
};

const getById = async (id: number): Promise<IDetalheNotavel| Error> => {
    try {
        const urlRelativa = urlBase + `/getbyid?id=${id}`;
        const { data } = await Api.get(urlRelativa);
        if (data) {
           return data;
        }
        return new Error('Notável não localizado.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro procurar notável.');
    }
};


const create = async (notavel: IDetalheNotavel): Promise<IDetalheNotavel> => {
    try {
        const urlRelativa = `${urlBase}/create`;

        const createNotavel: ICreateNotavel = {
            nome: notavel.nome || '',
            apelido: notavel.apelido || '',
            atividade: notavel.atividade || '',
            descricao: notavel.descricao || ''
        };

        const response = await Api.post<IRetornoNotavel>(
            urlRelativa, 
            createNotavel,
            { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
        );

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Resposta vazia da API ao criar o notável.');
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Erro na requisição:', error.response.data);
            throw new Error(`Erro ao criar o notável: ${error.response.data}`);
        } else {
            throw new Error((error as Error).message || 'Erro ao criar o notável.');
        }
    }
};

const getAll = async (page = 0, busca=''): Promise<TNotavelComTotalCount | Error> => {
    try {
        page = (page - 1) * Enviroment.LIMITE_DE_LINHAS       

        const urlRelativa = urlBase + `/getall?offset=${page}&limit=${Enviroment.LIMITE_DE_LINHAS}&busca=${busca}`;

        const { data } = await Api.get(urlRelativa);

        if (data && Array.isArray(data.data)) {
            return {
                data: data.data, 
                totalCount: data.totalCount
            };
        }

        return new Error('Erro ao listar os notáveis.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar notáveis.');
    }
};

const getAllSemFiltro = async (): Promise<TNotavelComTotalCount | Error> => {
    try {
        var urlRelativa = '/notaveis';

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

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const urlRelativa = urlBase + `/removebyid?id=${id}`;
        const { data } = await Api.delete(urlRelativa);
        if (data) {
           return data;
        }
        return new Error('Notável não localizado.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro procurar notável.');
    }
};

export const NotaveisService = {
    getAll,
    getAllSemFiltro,
    getById,
    create,
    updateById,
    deleteById,
};