import React, { useRef, useEffect } from 'react';
import { RoomSyncMessage } from '../../services/room.model';
import { RoomService } from '../../services/room.service';
import {
  getCanvasDataURL,
  replaceCanvasWithDataUrl,
} from '../../utils/canvasUtils';
import { DrawPoint } from '../models/DrawPoint.model';

const SyncBoardComponent = ({
  roomService,
  className,
}: {
  roomService: RoomService;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = document.documentElement.clientWidth;
      canvasRef.current.height = document.documentElement.clientHeight;
    }

    roomService.subscribeToSyncRequest(() => {
      if (!canvasRef.current) return;
      const dataUrl = getCanvasDataURL(canvasRef.current);
      dataUrl &&
        roomService.sendSync({
          dataUrl,
          width: canvasRef.current.width,
          height: canvasRef.current.height,
        });
    });
    roomService.subscribeToSync((roomSyncMessage: RoomSyncMessage) => {
      replaceCanvasWithDataUrl(
        canvasRef.current,
        roomSyncMessage.dataUrl,
        roomSyncMessage.width,
        roomSyncMessage.height
      );
    });
    roomService.subscribeToDrawUpdate((drawPoint: DrawPoint) => {
      drawCanvas(drawPoint);
    });

    roomService.sendSyncRequest();
  }, []);

  const drawCanvas = (p: DrawPoint) => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) return;

    canvasContext.strokeStyle = p.penColor;
    canvasContext.lineWidth = p.penWidth;
    canvasContext.lineCap = 'round';
    canvasContext.beginPath();
    canvasContext.moveTo(p.prevCoord.x, p.prevCoord.y);
    canvasContext.quadraticCurveTo(
      p.prevCoord.x,
      p.prevCoord.y,
      p.newCoord.x,
      p.newCoord.y
    );
    canvasContext.stroke();
  };

  return <canvas className={className} ref={canvasRef} />;
};

export default SyncBoardComponent;
