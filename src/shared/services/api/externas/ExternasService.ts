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


const urlCep = Enviroment.URL_CEP;


const getByCep = async (cep: string): Promise<IDetalheCep | Error> => {
    try {
        const urlRelativa = urlCep + `/${cep}/json`;
        const { data } = await Api.get(urlRelativa);
        if (!data.erro) {
           return data;
        }
        return new Error('CEP não localizado.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro procurar CEP.');
    }
};




export const ExternasService = {
    getByCep
};