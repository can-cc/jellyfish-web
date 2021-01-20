import axios, { AxiosRequestConfig } from 'axios';

export class ApiClientService {
    get(url: string, config?: AxiosRequestConfig) {
        return axios.get(`/api${url}`, config);
    }
}

export default new ApiClientService();