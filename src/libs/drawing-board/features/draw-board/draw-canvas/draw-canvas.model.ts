import { RoomService } from '../../../services/room.service';
export interface DrawCanvasComponentProps {
  roomService: RoomService;
  penColor: string;
  setImageData: React.Dispatch<React.SetStateAction<any>>;
}
