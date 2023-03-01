import { over, Client, Message } from 'stompjs';
import SockJS from 'sockjs-client';
import { getRoom, RoomInfo } from '../../shared/room/services';
import { DrawPoint } from '../features/models/DrawPoint.model';
import { RoomSendEvent, RoomSubscribeEvents } from './room.model';

export class RoomService {
  public wsClient: Client | null = null;

  private WS_URL = `${process.env.REACT_APP_API_URL}/ws`;
  private WS_NAMESPACE = `/app/draw-room`;
  private roomId: string;
  private userName: string;
  private roomInfo: RoomInfo | null = null;
  private isUserOwner = false;

  constructor(roomId: string, userName: string) {
    this.roomId = roomId;
    this.userName = userName;
  }

  async connectToRoom(): Promise<this> {
    try {
      this.roomInfo = await getRoom(this.roomId);
      this.wsClient = await this.connectToRoomWS();
      this.isUserOwner = this.roomInfo.users.some(
        (info) => info.name === this.userName
      );

      return this;
    } catch (errConnectingToRoom) {
      console.error(errConnectingToRoom);
      throw errConnectingToRoom;
    }
  }

  sendDrawUpdate(drawPoint: DrawPoint): void {
    this.sendMessage(RoomSendEvent.DrawUpdate, JSON.stringify(drawPoint));
  }

  sendSync(dataUrl: string): void {
    this.sendMessage(RoomSendEvent.Sync, dataUrl);
  }

  sendSyncRequest(): void {
    if (!this.isUserOwner) {
      this.sendMessage(
        RoomSendEvent.SyncRequest,
        JSON.stringify({ userName: this.userName })
      );
    }
  }

  subscribeToDrawUpdate(callback: (drawpoint: DrawPoint) => void) {
    if (!this.wsClient || !this.roomId) return;
    this.wsClient.subscribe(
      `/draw-room/${this.roomId}/${RoomSubscribeEvents.DrawPointUpdated}`,
      (msg: Message) => {
        if (!msg.body) return;
        callback(JSON.parse(msg.body));
      }
    );
  }

  subscribeToSyncRequest(callback: () => void) {
    if (!this.wsClient || !this.isUserOwner) return;
    this.wsClient.subscribe(
      `/draw-room/${this.roomId}/${RoomSubscribeEvents.SyncRequest}`,
      () => callback()
    );
  }

  subscribeToSync(callback: (dataUrl: string) => void) {
    if (!this.wsClient || this.isUserOwner) return;
    this.wsClient.subscribe(
      `/draw-room/${this.roomId}/${RoomSubscribeEvents.Sync}`,
      (msg: Message) => {
        if (!msg.body) return;
        callback(msg.body);
      }
    );
  }

  private connectToRoomWS(): Promise<Client> {
    return new Promise((resolve, reject) => {
      const sockjs = new SockJS(this.WS_URL);
      const stompClient = over(sockjs);
      stompClient.connect(
        {},
        () => resolve(stompClient),
        (err: any) => {
          console.error('Error while connecting to stomp');
          console.error(err);
          reject(err);
        }
      );
    });
  }

  private sendMessage(event: RoomSendEvent, message: string): void {
    if (!this.wsClient) return;
    this.wsClient.send(
      `${this.WS_NAMESPACE}/${this.roomId}/${event}`,
      {},
      message
    );
  }
}
