import { Enviroment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemAdmirador {
    id: number;
    nomeCompleto: string;
    email: string;
    idade: number;
    notavelId: number;
}

export interface IDetalheAdmirador {
    id: number;
    nomeCompleto: string;
    email: string;
    idade: number;
    notavelId: number;
}

type TAdmiradorComTotalCount = {
    data: IListagemAdmirador[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TAdmiradorComTotalCount | Error> => {
    try {
        const urlRelativa = `/admiradores?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
        const { data, headers } = await Api.get(urlRelativa);
        
        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
            };
        }

        return new Error('Erro ao listar os admiradores.');
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os admiradores.');
    }
};

const getById = async (id: number): Promise<IDetalheAdmirador | Error> => {
    try {
        const { data } = await Api.get(`/admiradores/${id}`);
        if (data) {
            return data;
        }
        return new Error('Erro ao consultar o admirador.');
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar o admirador.');
    }
};

const create = async (admirador: Omit<IDetalheAdmirador, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post<IDetalheAdmirador>('/admiradores/', admirador);
        if (data) {
            return data.id;
        }
        return new Error('Erro ao criar o admirador.');
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o admirador.');
    }
};

const updateById = async (id: number, admirador: IDetalheAdmirador): Promise<void | Error> => {
    try {
        await Api.put(`/admiradores/${id}`, admirador);
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao alterar o admirador.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/admiradores/${id}`);
    } catch (error) {
        console.log(error);
        return new Error((error as { message: string }).message || 'Erro ao excluir o admirador.');
    }
};

export const AdmiradoresService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};