import http from "@core/services/request";
import { SafeAny } from "@core/types/Safe";
import { IClient } from "@core/types/client";

export const getClientsList = (params: SafeAny) => {
    return http.request({
        url: 'client/getListPager',
        method: 'post',
        data: { ...params }
    })
}

export const createClient = (params: IClient) => {
    return http.request<IClient>({
        url: "client/create",
        method: 'post',
        data: { ...params }
    })
}
export const updateClient = (params: IClient) => {
    return http.request<IClient>({
        url: "client/update",
        method: 'post',
        data: { ...params }
    })
}

export const getClientById = (clientId: number) => {
    return http.request<IClient>({
        url: "client/get",
        method: 'post',
        data: { clientId }
    })
}