import { Enviroment } from "../../environment";
import { Api } from "../api/axios-config";



interface IListagemNotavel{
    id: number;
    nome: string;
    apelido: string;
    atividade: string;
    descricao: string;
}



const getAll = async (page = 1, filter = ''): Promise<any> => {
    try{
        const urlRelativa = `notaveis/_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`;

        const { data } = await Api.get(urlRelativa);

    }
    catch ( error )
    {

    }
};

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};



export const NotaveisService = () => {
    getAll
    getById
    create
    updateById
    deleteById


};