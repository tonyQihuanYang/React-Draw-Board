import React, { useRef, useEffect } from 'react';

const CanvasViewComponent = ({ imageData }: { imageData?: ImageData }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!imageData) {
      return;
    }
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext) {
      return;
    }
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 600;
    tempCanvas.height = 600;
    const tempCanvasCtx = tempCanvas.getContext('2d');
    tempCanvasCtx && tempCanvasCtx.putImageData(imageData, 0, 0);
    canvasContext.drawImage(tempCanvas, 0, 0);
  }, [imageData]);

  return (
    <canvas
      style={{ position: 'absolute', border: '1px black solid' }}
      height="600"
      width="600"
      ref={canvasRef}
    />
  );
};

export default CanvasViewComponent;
