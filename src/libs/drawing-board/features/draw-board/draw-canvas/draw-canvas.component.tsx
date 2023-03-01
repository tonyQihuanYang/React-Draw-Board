import React, { useRef, useEffect } from 'react';
import {
  clearCanvas,
  getCanvasDataURL,
  getCanvasImageData,
} from '../../../utils/canvasUtils';
import { CanvasCoordinate, DrawPoint } from '../../models/DrawPoint.model';
import { DrawCanvasComponentProps } from './draw-canvas.model';
import './draw-canvas.style.css';

const DrawCanvasComponent = ({
  roomService,
  penColor,
  setImageData,
}: DrawCanvasComponentProps) => {
  const readerRef = useRef<FileReader>(new FileReader());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPointerDown = useRef(false);
  const prevCoord = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 600;
      canvasRef.current.height = 600;

      canvasRef.current?.addEventListener(
        'touchmove',
        (event) => {
          event.preventDefault();
          drawLine(event.touches[0].clientX, event.touches[0].clientY);
        },
        { passive: false }
      );

      canvasRef.current?.addEventListener(
        'touchstart',
        (event) => {
          event.preventDefault();
          startDrawing(event.touches[0].clientX, event.touches[0].clientY);
        },
        { passive: false }
      );

      canvasRef.current?.addEventListener(
        'touchend',
        (event) => {
          event.preventDefault();
          stopDrawing();
        },
        { passive: false }
      );
    }
  }, []);

  const startDraw = (_point: CanvasCoordinate) => {
    const newDrawpoint = {
      prevCoord: prevCoord.current,
      newCoord: _point,
      penWidth: 1,
      penColor,
    };
    roomService.sendDrawUpdate(newDrawpoint);
    drawCanvas(newDrawpoint);
    prevCoord.current = _point;
  };

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

  const startDrawing = (clientX: number, clientY: number) => {
    isPointerDown.current = true;
    prevCoord.current = calcCoordinate(clientX, clientY);
  };

  const drawLine = (clientX: number, clientY: number) => {
    if (isPointerDown.current) {
      startDraw(calcCoordinate(clientX, clientY));
    }
  };

  const stopDrawing = () => {
    isPointerDown.current = false;
    if (!canvasRef.current || !readerRef.current) {
      return;
    }

    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) {
      return;
    }
    //
    const imageData = getCanvasImageData(canvasRef.current);
    const dataURL = getCanvasDataURL(canvasRef.current);
    // const arrayBuffer = await getCanvasArrayBuffer(canvasRef.current);
    setImageData({ imageData, dataURL, arrayBuffer: null });
    clearCanvas(canvasRef.current);
  };

  const calcCoordinate = (
    clientX: number,
    clientY: number
  ): CanvasCoordinate => {
    const boundingArea = canvasRef.current?.getBoundingClientRect();
    if (!boundingArea) {
      return { x: 0, y: 0 };
    }
    const scrollLeft = window.scrollX ?? 0;
    const scrollTop = window.scrollY ?? 0;
    const x = clientX - boundingArea.left - scrollLeft;
    const y = clientY - boundingArea.top - scrollTop;
    return { x, y };
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    startDrawing(event.pageX, event.pageY);
  };
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    drawLine(event.pageX, event.pageY);
  };

  return (
    <canvas
      id="canvasId"
      className="canvas-component-wrapper"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrawing}
    />
  );
};

export default DrawCanvasComponent;
