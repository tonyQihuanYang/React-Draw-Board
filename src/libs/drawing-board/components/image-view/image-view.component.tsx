import React, { useRef, useEffect } from 'react';

const ImageViewComponent = ({ imageData }: { imageData?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 600;
      canvasRef.current.height = 600;
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
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasRef.current.width;
    tempCanvas.height = canvasRef.current.height;

    let image = new Image();
    if (image) {
      image.addEventListener(
        'load',
        function () {
          canvasContext.drawImage(
            image,
            0,
            0,
            tempCanvas.height,
            tempCanvas.width
          );
        },
        false
      );
      image.src = imageData;
    }
  }, [imageData]);

  return (
    <canvas
      style={{ position: 'absolute', border: '1px black solid' }}
      ref={canvasRef}
    />
  );
};

export default ImageViewComponent;
