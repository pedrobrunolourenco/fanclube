import { Enviroment } from "../../../environment";
import { Api } from "../axios-config";



export interface IDetalheCep {
    cep: string,
    logradouro: string,
    complemento: string,
    unidade: string,
    bairro: string,
    localidade: string,
    uf : string,
    estado: string,
    regiao: string,
    ibge : string,
    gia : string,
    ddd : string,
    siafi : string
}

export interface IDetalheWikPedia {
    imagem: string,
    apelido: string,
    atividade: string,
    descricao: string
}


const urlCep = Enviroment.URL_CEP;
const urlWik = Enviroment.URL_WIKPEDIA;

const getByWikPedia = async (apelido: string): Promise<IDetalheWikPedia | Error> => {
    try {
        const chave = apelido.split(" ").join("_");
        const urlRelativa = urlWik + `/${chave}`;
        const { data } = await Api.get(urlRelativa);
        if (!data.erro) {
           return {
             imagem: data.thumbnail.source,
             apelido: apelido,
             atividade: data.description,
             descricao: data.extract
           }
        }
        return new Error('Notável não localizado.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro na consulta do notável.');
    }
};



const getByCep = async (cep: string): Promise<IDetalheCep | Error> => {
    try {
        const urlRelativa = urlCep + `/${cep}/json`;
        const { data } = await Api.get(urlRelativa);
        if (!data.erro) {
           return data;
        }
        return new Error('CEP não localizado.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro na consulta do CEP.');
    }
};




export const ExternasService = {
    getByCep,
    getByWikPedia
};