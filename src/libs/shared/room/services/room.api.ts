import axios, { AxiosResponse } from 'axios';
import { CreateRoomPayload, JoinRoomPayload, RoomInfo } from './room.model';
const URL = process.env.REACT_APP_API_URL;

export async function createRoom(
  username: CreateRoomPayload
): Promise<RoomInfo | undefined> {
  try {
    const { data } = await axios.post<RoomInfo>(
      `${URL}/room/create/${username}`
    );
    return data || null;
  } catch (err) {
    throw err;
  }
}

export async function joinRoom({
  roomId,
  name,
}: JoinRoomPayload): Promise<RoomInfo | undefined> {
  try {
    const { data } = await axios.post<RoomInfo>(
      `${URL}/room/join/${roomId}/${name}`
    );
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getRoom(roomId: string) {
  try {
    const { data } = await axios.get<RoomInfo>(`${URL}/room/${roomId}`);
    return data;
  } catch (err) {
    throw err;
  }
}
