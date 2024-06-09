import axios from 'axios';
import { responseInterceptor, errorInterceptor } from './interceptors';

import { Enviroment } from '../../../environment';


const Api = axios.create({
    baseURL: Enviroment.URL_BASE
});


Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
);


export { Api };