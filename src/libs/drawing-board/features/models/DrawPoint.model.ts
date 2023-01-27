export interface CanvasCoordinate {
  x: number;
  y: number;
}

export interface DrawPoint {
  prevCoord: CanvasCoordinate;
  newCoord: CanvasCoordinate;
  penColor: string;
  penWidth: number;
}

export interface DrawPointMessage {
  roomId: string;
  sendBy: string;
  message: DrawPoint;
}
