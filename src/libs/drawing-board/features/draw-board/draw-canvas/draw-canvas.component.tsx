import React, { useRef, useEffect, useState } from 'react';
import { CanvasCoordinate, DrawPoint } from '../../models/DrawPoint.model';
import { DrawCanvasComponentProps } from './draw-canvas.model';
import './draw-canvas.style.css';

const MINE_TYPE = 'image/png';
const DrawCanvasComponent = ({
  penColor,
  setImageData,
}: DrawCanvasComponentProps) => {
  console.log('DrawCanvasComponent..');
  const readerRef = useRef<FileReader>(new FileReader());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPointerDown = useRef(false);
  const prevCoord = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      // canvasRef.current.height = window.innerHeight;
      canvasRef.current.width = 600;
      canvasRef.current.height = 600;
    }
  });

  const startDraw = (_point: CanvasCoordinate) => {
    const newDrawpoint = {
      prevCoord: prevCoord.current,
      newCoord: _point,
      penWidth: 1,
      penColor,
    };
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

    const imageData = canvasContext.getImageData(0, 0, 600, 600);
    const dataURL = canvasRef.current.toDataURL();
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        return;
      }
      try {
        const arrayBuffer = await blob.arrayBuffer();
        setImageData({ imageData, dataURL, arrayBuffer: arrayBuffer });
        canvasContext.clearRect(0, 0, 600, 600);
      } catch (err) {
        console.error(err);
      }
    }, MINE_TYPE);
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

  const handleTouchDown = (event: React.TouchEvent<HTMLCanvasElement>) => {
    console.log('td');
    startDrawing(event.touches[0].clientX, event.touches[0].clientY);
  };
  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    console.log('tm');
    drawLine(event.touches[0].clientX, event.touches[0].clientY);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    startDrawing(event.clientX, event.clientY);
  };
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('mm');
    drawLine(event.clientX, event.clientY);
  };

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
  canvasRef.current?.addEventListener(
    'mousemove',
    (event) => {
      event.preventDefault();
    },
    { passive: false }
  );

  return (
    <canvas
      id="canvasId"
      className="canvas-component-wrapper"
      ref={canvasRef}
      // onTouchStart={handleTouchDown}
      // onTouchMove={handleTouchMove}
      // onTouchCancel={stopDrawing}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrawing}
    />
  );
};

export default DrawCanvasComponent;
