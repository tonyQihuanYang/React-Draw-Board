import React, { useRef, useEffect, useState } from 'react';
import { Client, Message } from 'stompjs';
import { CanvasCoordinate, DrawPoint } from '../models/DrawPoint.model';

const SyncBoardComponent = ({
  stompClient,
  roomId,
  className,
}: {
  stompClient: Client;
  roomId: string;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 600;
      canvasRef.current.height = 600;
    }
    stompClient.subscribe(`/draw-room/${roomId}/update`, (msg: Message) => {
      const message = JSON.parse(msg.body);
      const newDrawpoint = message.message as unknown as DrawPoint;
      drawCanvas(newDrawpoint);
    });
  }, []);

  const drawCanvas = (p: DrawPoint) => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) {
      return;
    }
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
