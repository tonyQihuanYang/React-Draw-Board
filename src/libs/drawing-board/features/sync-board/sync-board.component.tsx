import React, { useRef, useEffect } from 'react';
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
      canvasRef.current.width = 600;
      canvasRef.current.height = 600;
    }

    roomService.subscribeToSyncRequest(() => {
      const dataUrl = getCanvasDataURL(canvasRef.current);
      dataUrl && roomService.sendSync(dataUrl);
    });
    roomService.subscribeToSync((dataURl: string) => {
      replaceCanvasWithDataUrl(canvasRef.current, dataURl);
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

  return (
    <div className={className} style={{ display: 'block', overflow: 'hidden' }}>
      <canvas className={className} ref={canvasRef} />
    </div>
  );
};

export default SyncBoardComponent;
