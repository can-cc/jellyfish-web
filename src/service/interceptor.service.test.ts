import axios from 'axios';
import { Interceptor } from './interceptor.service';
import { StoreAuthHeaderKey } from '../config/constrant';

test('interceptor setupAxiosInterceptor', () => {
  window.localStorage.setItem(StoreAuthHeaderKey, '123');
  const appInterceptorService = new Interceptor();
  appInterceptorService.setupAxiosInterceptor();
  expect(axios.defaults.headers.common['App-Authorization']).toEqual('Bearer 123');
});
