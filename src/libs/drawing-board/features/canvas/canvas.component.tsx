import React, { useRef, useEffect, useState } from 'react';
import { CanvasComponentProps, CanvasCoordinate } from './canvas.model';
import './canvas.style.css';

const CanvasComponent = ({ penColor }: CanvasComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [point, setPoint] = useState<CanvasCoordinate | null>(null);
  const [prevCoord, setPrevCoord] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (point) {
      draw(point);
    }
    console.log('..');
  }, [point]);

  const draw = (newCoord: CanvasCoordinate) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      return;
    }
    canvasContext.strokeStyle = penColor;
    canvasContext.lineWidth = 1;
    canvasContext.lineCap = 'round';
    canvasContext.beginPath();
    canvasContext.moveTo(prevCoord.x, prevCoord.y);
    canvasContext.lineTo(newCoord.x, newCoord.y);
    canvasContext.stroke();
    setPrevCoord({ x: newCoord.x, y: newCoord.y });
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
