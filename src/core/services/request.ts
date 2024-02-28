import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";
import { SafeAny } from "@core/types/Safe";
interface IRequestOptions {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}
interface IResponse<T = SafeAny> extends SafeAny {
  code: number;
  message: string;
  data?: T;
}
class HttpClient {
  private readonly instance: AxiosInstance;
  constructor(baseURL?: string) {
    this.instance = axios.create({ baseURL });
    this.instance.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse
    );
  }
  private handleSuccessResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }
  private handleErrorResponse(error: SafeAny): Promise<never> {
    message.error(error.message || "请求失败");
    return Promise.reject(error);
  }
  public async request<T = SafeAny>({
    url,
    method,
    data,
    params,
    headers,
  }: IRequestOptions): Promise<IResponse<T>> {
    const response = await this.instance.request<T>({
      url,
      method,
      data,
      params,
      headers,
    });
    return {
      ...response.data,
      code: response.status,
      message: response.statusText,
    };
  }
}

const http = new HttpClient('/api');

export default http;
