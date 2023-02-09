import React, { useRef, useEffect } from 'react';

const MINE_TYPE = 'image/png';
const ImageViewComponent = ({
  imageData,
}: {
  imageData?: ArrayBuffer | string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      // canvasRef.current.width = window.innerWidth;
      // canvasRef.current.height = window.innerHeight;
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
      // const blob = new Blob([imageData as unknown as ArrayBuffer], {
      //   type: MINE_TYPE,
      // });
      // image.src = URL.createObjectURL(blob);
      image.src = imageData as unknown as string;
    }
    //
    //
    // const tempCanvasCtx = tempCanvas.getContext('2d');
    // tempCanvasCtx && tempCanvasCtx.putImageData(image, 0, 0);
    // canvasContext.drawImage(tempCanvas, 0, 0);
  }, [imageData]);

  return (
    <canvas
      style={{ position: 'absolute', border: '1px black solid' }}
      ref={canvasRef}
    />
  );
};

export default ImageViewComponent;
