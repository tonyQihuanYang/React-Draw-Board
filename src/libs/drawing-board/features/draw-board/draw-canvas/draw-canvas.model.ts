import { Client } from 'stompjs';
export interface DrawCanvasComponentProps {
  roomId: string;
  userName: string;
  stompClient: Client;
  penColor: string;
  setImageData: React.Dispatch<React.SetStateAction<any>>;
}
