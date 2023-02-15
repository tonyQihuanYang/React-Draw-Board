import axios, { AxiosResponse } from 'axios';
import { CreateRoomPayload, JoinRoomPayload } from './room.model';
const URL = process.env.REACT_APP_API_URL;

export function createRoom(
  username: CreateRoomPayload
): Promise<AxiosResponse<any, any>> {
  return axios.post(`${URL}/room/create/${username}`);
}

export function joinRoom({
  roomId,
  name,
}: JoinRoomPayload): Promise<AxiosResponse<any, any>> {
  return axios.post(`${URL}/room/join/${roomId}/${name}`);
}
