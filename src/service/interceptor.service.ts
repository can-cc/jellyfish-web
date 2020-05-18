import axios, { AxiosResponse } from 'axios';
import { history } from '../history';
import { RequestAuthHeaderKey, StoreAuthHeaderKey } from '../config/constrant';
import { authService } from './auth.service';

export class Interceptor {
  setupAxiosInterceptor() {
    axios.interceptors.response.use(
      this.responseSuccessInterceptor,
      Interceptor.responseFailureInterceptor
    );
    axios.defaults.headers.common[RequestAuthHeaderKey] =
      'Bearer ' + window.localStorage.getItem(StoreAuthHeaderKey);
  }

  private responseSuccessInterceptor(response: AxiosResponse) {
    return response;
  }

  private static responseFailureInterceptor(error: any) {
    if (error.response.status === 401) {
      authService.removeStoreAuthToken();
      history.push('/login');
    }
    return Promise.reject(error);
  }
}

export const appInterceptorService = new Interceptor();
