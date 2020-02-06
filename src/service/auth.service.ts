import { StoreAuthHeaderKey } from '../config/constrant';

export class AuthService {
  onLoggedIn(token: string) {
    this.setStoreAuthToken(token);
  }

  removeStoreAuthToken() {
    window.localStorage.removeItem(StoreAuthHeaderKey);
  }

  setStoreAuthToken(token: string) {
    window.localStorage.setItem(StoreAuthHeaderKey, token);
  }
}

export const authService = new AuthService();
