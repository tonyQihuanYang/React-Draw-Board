import { RoomService } from '../../../services/room.service';
export interface DrawCanvasComponentProps extends DrawCanvasOpts {
  roomService: RoomService;
  setImageData: React.Dispatch<React.SetStateAction<any>>;
}

export interface DrawCanvasOpts {
  penColor: string;
  penWidth: number;
}
