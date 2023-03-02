import React, { useRef, useEffect } from 'react';
import {
  clearCanvas,
  getCanvasDataURL,
  getCanvasImageData,
} from '../../../utils/canvasUtils';
import { CanvasCoordinate, DrawPoint } from '../../models/DrawPoint.model';
import { DrawCanvasComponentProps, DrawCanvasOpts } from './draw-canvas.model';
import './draw-canvas.style.css';

const DrawCanvasComponent = ({
  roomService,
  penColor,
  penWidth,
  setImageData,
}: DrawCanvasComponentProps) => {
  const readerRef = useRef<FileReader>(new FileReader());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const touchMoveEventRef = useRef<null | ((e: TouchEvent) => void)>(null);
  const touchStartEventRef = useRef<null | ((e: TouchEvent) => void)>(null);
  const touchEndEventRef = useRef<null | ((e: TouchEvent) => void)>(null);

  const isPointerDown = useRef(false);
  const prevCoord = useRef({ x: 0, y: 0 });
  const drawOpts: DrawCanvasOpts = {
    penColor,
    penWidth,
  };

  useEffect(() => {
    /**
     * Note: Reason manully listen events is becasue it needs
     * e.preventDefault on Ipad to prevent the scoll
     */
    if (!canvasRef.current) return;

    canvasRef.current.width = 600;
    canvasRef.current.height = 600;

    // Remove all event listeners if present
    touchMoveEventRef.current &&
      canvasRef.current.removeEventListener(
        'touchmove',
        touchMoveEventRef.current
      );
    touchStartEventRef.current &&
      canvasRef.current.removeEventListener(
        'touchstart',
        touchStartEventRef.current
      );
    touchEndEventRef.current &&
      canvasRef.current.removeEventListener(
        'touchend',
        touchEndEventRef.current
      );

    // define all event handlers
    touchMoveEventRef.current = (event: TouchEvent) => {
      event.preventDefault();
      drawLine(event.touches[0].clientX, event.touches[0].clientY);
    };

    touchStartEventRef.current = (event: TouchEvent) => {
      event.preventDefault();
      startDrawing(event.touches[0].clientX, event.touches[0].clientY);
    };

    touchEndEventRef.current = (event: TouchEvent) => {
      event.preventDefault();
      stopDrawing();
    };

    // listener to all event handlers
    canvasRef.current.addEventListener('touchmove', touchMoveEventRef.current, {
      passive: false,
    });
    canvasRef.current.addEventListener(
      'touchstart',
      touchStartEventRef.current,
      { passive: false }
    );
    canvasRef.current.addEventListener('touchend', touchEndEventRef.current, {
      passive: false,
    });
  }, [penColor, penWidth]);

  const startDraw = (_point: CanvasCoordinate) => {
    const newDrawpoint = {
      prevCoord: prevCoord.current,
      newCoord: _point,
      ...drawOpts,
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
