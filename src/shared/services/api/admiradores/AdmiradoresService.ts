import axios from "axios";
import { Enviroment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemAdmirador {
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    email: string;
    endereco: string;
    id: number;
    idade: number;
    nome: string;
    notavelId: number;
    uf: string;
}

export interface IDetalheAdmirador {
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    email: string;
    endereco: string;
    id: number;
    idade: number;
    nome: string;
    notavelId: number | undefined;
    uf: string;
}

export interface ICreateAdmirador {
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    email: string;
    endereco: string;
    idade: number;
    nome: string;
    notavelId: number;
    uf: string;
}

export interface IRequestGet {
    offset: string
    limit: string
}

type TAdmiradorComTotalCount = {
    data: IListagemAdmirador[];
    totalCount: number;
}

export interface IRetornoAdmirador {
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    email: string;
    endereco: string;
    id: number;
    idade: number;
    nome: string;
    notavelId: number;
    uf: string;
    sucesso: boolean;
}


const urlBase = Enviroment.URL_ADMIRADOR;


const updateById = async (notavel: IDetalheAdmirador): Promise<IDetalheAdmirador> => {
    try {
        const urlRelativa = `${urlBase}/update`;

        const response = await Api.put<IDetalheAdmirador>(
            urlRelativa, 
            notavel,
            { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
        );

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Resposta vazia da API ao alterar o admirador.');
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Erro na requisição:', error.response.data);
            throw new Error(`Erro ao alterar o admirador: ${error.response.data}`);
        } else {
            throw new Error((error as Error).message || 'Erro ao altrar o admirador.');
        }
    }
};


const getById = async (id: number): Promise<IDetalheAdmirador| Error> => {
    try {
        const urlRelativa = urlBase + `/getbyid?id=${id}`;
        const { data } = await Api.get(urlRelativa);
        if (data) {
           return data;
        }
        return new Error('Admirador não localizado.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro procurar admirador.');
    }
};


const create = async (admirador: IDetalheAdmirador): Promise<IDetalheAdmirador> => {
    try {
        const urlRelativa = `${urlBase}/create`;

        const createAdmirador: ICreateAdmirador = {
            bairro: admirador.bairro || '',
            cep: admirador.cep || '',
            cidade: admirador.cidade || '',
            complemento: admirador.complemento || '',
            email: admirador.email || '',
            endereco: admirador.endereco || '',
            idade: admirador.idade,
            nome: admirador.nome || '',
            notavelId: admirador.notavelId || 0,
            uf: admirador.uf
        };

        const response = await Api.post<IRetornoAdmirador>(
            urlRelativa, 
            createAdmirador,
            { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
        );

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Resposta vazia da API ao criar o admirador.');
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Erro na requisição:', error.response.data);
            throw new Error(`Erro ao criar o admirador: ${error.response.data}`);
        } else {
            throw new Error((error as Error).message || 'Erro ao criar o admirador.');
        }
    }
};

const getAll = async (page = 0, busca=''): Promise<TAdmiradorComTotalCount | Error> => {
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

        return new Error('Erro ao listar os admiradores.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar admiradores.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const urlRelativa = urlBase + `/removebyid?id=${id}`;
        const { data } = await Api.delete(urlRelativa);
        if (data) {
           return data;
        }
        return new Error('Admirador não localizado.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro remover admirador.');
    }
};

export const AdmiradoresService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};