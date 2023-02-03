import React, { useRef, useEffect } from 'react';

const MINE_TYPE = 'image/png';
const ImageViewComponent = ({
  imageData,
}: {
  imageData?: ArrayBuffer | string;
}) => {
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

    let image = new Image();
    if (image) {
      image.addEventListener(
        'load',
        function () {
          canvasContext.drawImage(image, 0, 0, 600, 600);
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
      height="600"
      width="600"
      ref={canvasRef}
    />
  );
};

export default ImageViewComponent;
