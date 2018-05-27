import axios from 'axios';
import { history } from '../history';

function responseSuccessInterceptor(response) {
  return response;
}

function responseFailureInterceptor(error) {
  if (error.response.status === 401) {
    window.localStorage.removeItem('jwt');
  }
  return Promise.reject(error);
}

function setupAxiosInterceptor() {
  axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);
}

function setupAxiosJwtHeader(jwt: string) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('jwt');
}

export function setRequestAuth() {
  setupAxiosInterceptor();
  setupAxiosJwtHeader();
}
