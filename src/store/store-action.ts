import { AppStore } from './store';

export class StoreAction {
  constructor(store: AppStore) {
    // store.userInfo$
    //   .pipe(
    //     mergeMap((userInfo: UserInfo) => {
    //       return axios.get(`/api/avatar/${userInfo.id}`).then(r => r.data);
    //     })
    //   )
    //   .subscribe(store.userAvatar$);
  }
}
