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

export interface IRequestGet {
    offset: string
    limit: string
}


type TNotavelComTotalCount = {
    data: IListagemNotavel[];
    totalCount: number;
}

const urlBase = Enviroment.URL_NOTAVEL;

const getAll = async (page = 0, busca=''): Promise<TNotavelComTotalCount | Error> => {
    try {
        page = page - 1;
        if(page > 0) page = page + (Enviroment.LIMITE_DE_LINHAS - 1);

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
    getAllSemFiltro,
    getById,
    create,
    updateById,
    deleteById,
};