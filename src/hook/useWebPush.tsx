import webPushService, { WebPushService } from "../service/web-push.service";

export function useWebPush(): WebPushService {
    return webPushService;
}