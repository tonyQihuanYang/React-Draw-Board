import React, { useRef, useEffect, useState } from 'react';
import { CanvasCoordinate, DrawPoint } from '../models/DrawPoint.model';
import { CanvasComponentProps } from './canvas.model';
import './canvas.style.css';

const CanvasComponent = ({
  penColor,
  setDrawPoint,
  syncDrawPoint,
}: CanvasComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [point, setPoint] = useState<CanvasCoordinate | null>(null);
  const [prevCoord, setPrevCoord] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (point) {
      const newDrawpoint = {
        prevCoord,
        newCoord: point,
        penWidth: 1,
        penColor,
      };
      draw(newDrawpoint);
      setDrawPoint(newDrawpoint);
      setPrevCoord(point);
    }
  }, [point]);

  useEffect(() => {
    if (syncDrawPoint) {
      draw(syncDrawPoint);
    }
  }, [syncDrawPoint]);

  const draw = (p: DrawPoint) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      return;
    }
    canvasContext.strokeStyle = p.penColor;
    canvasContext.lineWidth = p.penWidth;
    canvasContext.lineCap = 'round';
    canvasContext.beginPath();
    canvasContext.moveTo(p.prevCoord.x, p.prevCoord.y);
    canvasContext.lineTo(p.newCoord.x, p.newCoord.y);
    canvasContext.stroke();
  };

  const startDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    setIsPointerDown(true);
    setPrevCoord(getCoordinateByPointerEvent(event));
  };

  const drawLine = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (isPointerDown) {
      setPoint(getCoordinateByPointerEvent(event));
    }
  };

  const stopDrawing = () => {
    setIsPointerDown(false);
  };

  const getCoordinateByPointerEvent = (
    event: React.PointerEvent<HTMLCanvasElement>
  ): CanvasCoordinate => {
    const boundingArea = canvasRef.current?.getBoundingClientRect();
    if (!boundingArea) {
      return { x: 0, y: 0 };
    }
    const scrollLeft = window.scrollX ?? 0;
    const scrollTop = window.scrollY ?? 0;
    const x = event.pageX - boundingArea.left - scrollLeft;
    const y = event.pageY - boundingArea.top - scrollTop;
    return { x, y };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    startDrawing(event);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    drawLine(event);
  };
  const handlePointerUp = () => {
    stopDrawing();
  };
  const handlePointerOut = () => {
    stopDrawing();
  };

  return (
    <canvas
      className="canvas-component-wrapper"
      height="600"
      width="600"
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerOut}
    />
  );
};

export default CanvasComponent;
