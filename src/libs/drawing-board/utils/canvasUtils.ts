export function clearCanvas(canvasEle: HTMLCanvasElement | null) {
  const canvasContext = getCanvas2DContext(canvasEle);
  if (!canvasContext || !canvasEle) {
    return null;
  }
  canvasContext.clearRect(0, 0, canvasEle.height, canvasEle.width);
}

export function replaceCanvasWithDataUrl(
  canvasEle: HTMLCanvasElement | null,
  dataUrl: string,
  width: number,
  height: number
): void {
  const canvasContext = getCanvas2DContext(canvasEle);
  if (!canvasContext || !canvasEle) {
    return;
  }
  const image = new Image();
  if (image) {
    image.addEventListener(
      'load',
      () => canvasContext.drawImage(image, 0, 0, width, height),
      false
    );
    image.src = dataUrl;
  }
}

export function getCanvasImageData(
  canvasEle: HTMLCanvasElement | null
): ImageData | null {
  const canvasContext = getCanvas2DContext(canvasEle);
  if (!canvasEle || !canvasContext) {
    return null;
  }
  return canvasContext.getImageData(0, 0, canvasEle.height, canvasEle.width);
}

export function getCanvasDataURL(
  canvasEle: HTMLCanvasElement | null
): string | null {
  if (!canvasEle) {
    return null;
  }
  return canvasEle.toDataURL();
}
export function getCanvasArrayBuffer(
  canvasEle: HTMLCanvasElement
): Promise<ArrayBuffer> {
  const canvasContext = getCanvas2DContext(canvasEle);
  if (!canvasContext) {
    return Promise.reject('Invalid Canvas Element');
  }
  return new Promise((resolve, reject) => {
    canvasEle.toBlob(async (blob) => {
      if (!blob) {
        return;
      }
      try {
        const arrayBuffer = await blob.arrayBuffer();
        resolve(arrayBuffer);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    }, 'image/png');
  });
}

function getCanvas2DContext(canvasEle?: HTMLCanvasElement | null) {
  return canvasEle?.getContext('2d', { willReadFrequently: true }) || null;
}
