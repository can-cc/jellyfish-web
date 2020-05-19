import { useEffect, useState } from 'react';
import { AppStore, appStore } from '../store/store';
import { Observable } from 'rxjs';

export function useStore<T>(selector: (appStore: AppStore) => Observable<T>) {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    const subscription = selector(appStore).subscribe(setResult);
    return function() {
      subscription.unsubscribe();
    };
  }, []);

  return result;
}
