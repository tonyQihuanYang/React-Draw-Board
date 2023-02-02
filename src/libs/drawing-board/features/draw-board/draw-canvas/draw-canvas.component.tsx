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

  const startDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDown.current = true;
    prevCoord.current = getCoordinateByPointerEvent(event);
  };

  const drawLine = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (isPointerDown.current) {
      startDraw(getCoordinateByPointerEvent(event));
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
    event.preventDefault();
    drawLine(event);
  };
  const handlePointerUp = () => {
    stopDrawing();
  };
  const handlePointerOut = () => {
    // stopDrawing();
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

export default DrawCanvasComponent;
