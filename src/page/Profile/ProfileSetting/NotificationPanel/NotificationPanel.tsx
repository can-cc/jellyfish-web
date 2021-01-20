import React from 'react';
import { AppButton } from '../../../../component/AppButton';
import { useApiClient } from '../../../../hook/useApiClient';
import { useWebPush } from '../../../../hook/useWebPush';
import {  toast } from 'react-toastify';

export function NotificationPanel() {

  const apiClient = useApiClient();
  const webPush = useWebPush();

    const onClick = async () => {
      const publicKey: string = (await apiClient.get('/vapid-key').then(result => result.data.vapidPublicKey));
      const convertedVapidKey = webPush.urlBase64ToUint8Array(publicKey);

      const registration = await window.navigator.serviceWorker.getRegistration(this.swScope);
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        toast('You already subscribed.');
      } else {
        const pushSubscription: PushSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        });

        webPush.addSubscriber(pushSubscription).then(
          res => {
            toast('Now you are subscribed');
          }
        ).catch(err => {
          toast('[App] Add subscriber request failed');
        });
      }
    };
    return <div>
      <AppButton onClick={onClick}>接受通知</AppButton>
    </div>
}