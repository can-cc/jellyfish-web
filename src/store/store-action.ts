import { AppStore } from './store';
import { mergeMap } from 'rxjs/operators';
import { UserInfo } from '../model/user-info';
import axios from 'axios';

export class StoreAction {
  constructor(store: AppStore) {
    store.userInfo$
      .pipe(
        mergeMap((userInfo: UserInfo) => {
          return axios.get(`/api/avatar/${userInfo.id}`).then(r => r.data);
        })
      )
      .subscribe(store.userAvatar$);
  }
}
