import axios, { AxiosResponse } from 'axios';
const URL = process.env.REACT_APP_API_URL;

export function healthCheck(): Promise<AxiosResponse<any, any>> {
  return axios.get(`${URL}/healthcheck`);
}
