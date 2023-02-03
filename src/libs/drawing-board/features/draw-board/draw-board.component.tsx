import { Client } from 'stompjs';
import React, { useEffect, useRef, useState } from 'react';
import CanvasViewComponent from '../../components/canvas-view/canvas-view.component';
import ColorPickerComponent from './color-picker/color-picker.component';
import DrawCanvasComponent from './draw-canvas/draw-canvas.component';
import ImageViewComponent from '../../components/image-view/image-view.component';

const DRAW_EVENT = '/app/draw-room';
const DrawBoardComponent = ({
  stompClient,
  roomId,
  userName,
}: {
  stompClient: Client;
  roomId: string;
  userName: string;
}) => {
  const [penColor, setPenColor] = useState('#000000');
  const [imageData, setImageData] = useState<{
    imageData: ImageData;
    arrayBuffer: ArrayBuffer;
    dataURL: string;
  }>();

  useEffect(() => {
    if (!imageData) {
      return;
    }
    const arrayBuffer = imageData.imageData.data.buffer;
    const drawRoomMessage = {
      roomId,
      sendBy: userName,
      message: imageData.dataURL,
    };
    // console.log(imageData);
    // console.log('Getting Update Of ImageData');
    // console.log(imageData.imageData.data.buffer);
    // var array = new Uint8ClampedArray(arrayBuffer);
    // const arrayToBase64String = (a: any) => {
    //   return btoa(String.fromCharCode(...a));
    // };
    // console.log(arrayToBase64String(array));
    // console.log(a);
    // console.log(imageData.arrayBuffer);

    // stompClient.send(
    //   DRAW_EVENT,
    //   { 'content-length': imageData.arrayBuffer.byteLength },
    //   // imageData.arrayBuffer as unknown as string
    //   imageData.arrayBuffer as unknown as string
    // );

    stompClient.send(
      DRAW_EVENT,
      {},
      // imageData.arrayBuffer as unknown as string
      JSON.stringify(drawRoomMessage)
    );
  }, [imageData]);

  return (
    <div style={{ display: 'block', overflow: 'hidden' }}>
      <ColorPickerComponent
        color={penColor}
        setColor={setPenColor}
      ></ColorPickerComponent>
      <div>
        <DrawCanvasComponent
          setImageData={setImageData}
          penColor={penColor}
        ></DrawCanvasComponent>
        {/* <CanvasViewComponent */}
        {/*   imageData={imageData?.imageData} */}
        {/* ></CanvasViewComponent> */}

        <ImageViewComponent imageData={imageData?.dataURL}></ImageViewComponent>
        {/* <ImageViewComponent */}
        {/*   imageData={imageData?.arrayBuffer} */}
        {/* ></ImageViewComponent> */}
      </div>
    </div>
  );
};

export default DrawBoardComponent;
