import React, { useRef, useEffect, useState } from 'react';
import { CanvasCoordinate } from './canvas.model';
import './canvas.style.css';

const CanvasComponent = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [canvasContext, setCanvasContext] =
  //   useState<CanvasRenderingContext2D | null>(null);
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) {
  //     return;
  //   }
  //   const context2d = canvas.getContext('2d');
  //   if (!context2d) {
  //     return;
  //   }
  //   setCanvasContext(context2d);
  // }, []);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [point, setPoint] = useState<CanvasCoordinate | null>(null);
  const [prevCoord, setPrevCoord] = useState({ x: 0, y: 0 });
  const [y, setY] = useState(0);

  useEffect(() => {
    if (point) {
      draw(point);
    }
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
    canvasContext.strokeStyle = '#FF0000';
    canvasContext.lineWidth = 1;
    canvasContext.lineCap = 'round';
    canvasContext.beginPath();
    canvasContext.moveTo(prevCoord.x, prevCoord.y);
    canvasContext.lineTo(newCoord.x, newCoord.y);
    canvasContext.stroke();
    setPrevCoord({ x: newCoord.x, y: newCoord.y });
  };

  const stopDrawing = () => {
    setIsMouseDown(false);
  };
  const startDrawing = (event: PointerEvent) => {
    setIsMouseDown(true);
    setPrevCoord(getCoordinateByPointerEvent(event));
  };

  const drawLine = (event: PointerEvent) => {
    if (isMouseDown) {
      setPoint(getCoordinateByPointerEvent(event));
    }
  };

  const getCoordinateByPointerEvent = (
    event: PointerEvent
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

  const handlePointerDown = (event: PointerEvent) => {
    startDrawing(event);
  };
  const handlePointerMove = (event: PointerEvent) => {
    drawLine(event);
  };
  const handlePointerUp = (event: PointerEvent) => {
    stopDrawing();
  };
  const handlePointerOut = (event: PointerEvent) => {
    stopDrawing();
  };

  return (
    <canvas
      className="canvas-component-wrapper"
      ref={canvasRef}
      {...props}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerOut}
    />
  );
};

export default CanvasComponent;
