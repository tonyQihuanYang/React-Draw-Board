export type CreateRoomPayload = string;
export interface JoinRoomPayload {
  roomId: number;
  name: string;
}

export enum RoomType {
  Owner = 'OWNER',
  Player = 'PLAYER',
}

export interface RoomUser {
  id: number;
  name: string;
  userType: RoomType;
}

export interface RoomInfo {
  id: string;
  users: RoomUser[];
}
