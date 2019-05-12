import axios from 'axios';
import { history } from '../history';

function responseSuccessInterceptor(response: any) {
  return response;
}

function responseFailureInterceptor(error: any) {
  if (error.response.status === 401) {
    window.localStorage.removeItem('jwt');
  }
  return Promise.reject(error);
}

function setupAxiosInterceptor() {
  axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);
}

function setupAxiosJwtHeader() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('jwt');
}

export function setRequestAuth() {
  setupAxiosInterceptor();
  setupAxiosJwtHeader();
}
