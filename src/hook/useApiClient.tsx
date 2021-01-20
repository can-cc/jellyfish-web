import apiClientService, { ApiClientService } from "../service/api-client.service";

export function useApiClient(): ApiClientService {
    return apiClientService;
}