import React, { useRef, useEffect } from 'react';

const CanvasViewComponent = ({ permanentCanvas }: { permanentCanvas: any }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!permanentCanvas) {
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
    tempCanvasCtx && tempCanvasCtx.putImageData(permanentCanvas, 0, 0);
    canvasContext.drawImage(tempCanvas, 0, 0);
  }, [permanentCanvas]);

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
