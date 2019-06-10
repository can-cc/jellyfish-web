import store from './store/store';
import axios from 'axios';


export class AppAction {

    static getUserInfo(userId: string) {
        axios.get<{
            avatarUrl: string;
            username: string;
        }>(`/api/auth/user/${userId}`).then(resp => {
            store.userInfo$.next({
                avatarUrl: resp.data.avatarUrl, 
                username: resp.data.username
            });
          });
    }

}