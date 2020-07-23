import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export abstract class HttpIntegration {
  protected readonly instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }
}
