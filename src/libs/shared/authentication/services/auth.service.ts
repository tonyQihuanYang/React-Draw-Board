import axios, { AxiosResponse } from 'axios';

export interface SignupDAO {
  email: string;
  password: string;
}

export interface SigninDAO {
  username: string;
  password: string;
}

const URL = process.env.REACT_APP_API_URL;

export function signup(
  signupInfo: SignupDAO
): Promise<AxiosResponse<any, any>> {
  return axios.post(`${URL}/auth/signup`, signupInfo);
}

export function signin(
  signinInfo: SigninDAO
): Promise<AxiosResponse<any, any>> {
  return axios.post(`${URL}/auth/signin`, signinInfo);
}
