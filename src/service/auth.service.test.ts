import { AuthService } from './auth.service';
import randomstring from 'randomstring';

test('authService onLoggedIn', () => {
  const authService = new AuthService();
  const mockToken = randomstring.generate(10);
  authService.onLoggedIn(mockToken);
  expect(window.localStorage.getItem('App-Authorization')).toEqual(mockToken);
});
