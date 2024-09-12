import axios from 'axios';

import { Enviroment } from '../../../environment';


const Api = axios.create({
    baseURL: Enviroment.URL_BASE,
    baseURL_NOTAVEL: Enviroment.URL_NOTAVEL,
    baseURL_ADMIRADOR: Enviroment.URL_ADMIRADOR
});

export { Api };