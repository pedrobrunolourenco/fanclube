import axios from 'axios';

import { Enviroment } from '../../../environment';


const Api = axios.create({
    baseURL: Enviroment.URL_BASE
});



export { Api };