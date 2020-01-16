import axios, { AxiosResponse } from 'axios';
import { history } from '../history';
import { RequestAuthHeaderKey, StoreAuthHeaderKey } from '../config/constrant';
import { authService } from './auth.service';

export class Interceptor {
  private responseSuccessInterceptor(response: AxiosResponse) {
    return response;
  }

  private responseFailureInterceptor(error: any) {
    if (error.response.status === 401) {
      authService.removeStoreAuthToken();
      history.push('/signin');
    }
    return Promise.reject(error);
  }

  setupAxiosInterceptor() {
    axios.interceptors.response.use(
      this.responseSuccessInterceptor,
      this.responseFailureInterceptor
    );
    axios.defaults.headers.common[RequestAuthHeaderKey] =
      'Bearer ' + window.localStorage.getItem(StoreAuthHeaderKey);
  }
}

export const appInterceptorService = new Interceptor();
