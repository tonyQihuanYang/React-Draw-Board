import React, { useRef, useEffect } from 'react';
import { replaceCanvasWithDataUrl } from '../../utils/canvasUtils';

const ImageViewComponent = ({ imageData }: { imageData?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = document.documentElement.clientWidth;
      canvasRef.current.height = document.documentElement.clientHeight;
    }
  }, []);
  useEffect(() => {
    if (!imageData || !canvasRef.current) {
      return;
    }
    const canvasContext = canvasRef.current.getContext('2d');
    if (!canvasContext) {
      return;
    }
    replaceCanvasWithDataUrl(
      canvasRef.current,
      imageData,
      canvasRef.current.width,
      canvasRef.current.height
    );
  }, [imageData]);

  return (
    <canvas
      style={{ position: 'absolute', top: 0, zIndex: 0, overflow: 'hidden' }}
      ref={canvasRef}
    />
  );
};

export default ImageViewComponent;
