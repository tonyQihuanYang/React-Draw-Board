export interface CanvasCoordinate {
  x: number;
  y: number;
}

export interface DrawPoint extends DrawOpts {
  prevCoord: CanvasCoordinate;
  newCoord: CanvasCoordinate;
}

export interface DrawOpts {
  penColor: string;
  penWidth: number;
}

export interface DrawPointMessage {
  roomId: string;
  sendBy: string;
  message: DrawPoint;
}
