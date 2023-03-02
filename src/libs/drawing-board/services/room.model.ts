export enum RoomSendEvent {
  DrawUpdate = 'drawUpdate',
  SyncRequest = 'syncRequest',
  Sync = '/sync',
}

export enum RoomSubscribeEvents {
  DrawPointUpdated = 'drawUpdated',
  SyncRequest = 'syncRequest',
  Sync = 'sync',
}

export interface RoomSyncMessage {
  dataUrl: string;
  width: number;
  height: number;
}
