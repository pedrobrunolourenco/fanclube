import { Enviroment } from "../../../environment";
import { Api } from "../axios-config";



interface IListagemAdmirador{
    id: number;
    nome: string;
    idade: number;
    notaveId: number;
}

interface IDetalheAdmirador{
    id: number;
    nome: string;
    idade: number;
    notaveId: number;
}

type TAdmiradorComTotalCount = {
   data : IListagemAdmirador[];
   totalCount: number;
}


const getAll = async (page = 1, filter = ''): Promise<TAdmiradorComTotalCount | Error> => {
    try{
        const urlRelativa = `notaveis/_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
        const { data, headers } = await Api.get(urlRelativa);
        if(data){
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS)
            };
        }
        return new Error('Erro ao listar os admiradores.');
    }
    catch ( error )
    {
        console.log(error);
        return new Error((error as {message:string}).message || 'Erro ao listar os admiradores.');
    }
};

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};



export const AdmiradoresService = () => {
    getAll
    getById
    create
    updateById
    deleteById


};