import { Client } from 'stompjs';
import React, { useEffect, useRef, useState } from 'react';
import ColorPickerComponent from './color-picker/color-picker.component';
import DrawCanvasComponent from './draw-canvas/draw-canvas.component';
import ImageViewComponent from '../../components/image-view/image-view.component';

const DRAW_EVENT = '/app/draw-room';
const DrawBoardComponent = ({
  stompClient,
  roomId,
  userName,
  className,
}: {
  stompClient: Client;
  roomId: string;
  userName: string;
  className?: string;
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
    const drawRoomMessage = {
      roomId,
      sendBy: userName,
      message: imageData.dataURL,
    };
    // stompClient.send(DRAW_EVENT, {}, JSON.stringify(drawRoomMessage));
  }, [imageData]);

  return (
    <div className={className} style={{ display: 'block', overflow: 'hidden' }}>
      <ColorPickerComponent
        color={penColor}
        setColor={setPenColor}
      ></ColorPickerComponent>
      <div>
        <DrawCanvasComponent
          stompClient={stompClient}
          roomId={roomId}
          userName={userName}
          setImageData={setImageData}
          penColor={penColor}
        ></DrawCanvasComponent>
        <ImageViewComponent imageData={imageData?.dataURL}></ImageViewComponent>
      </div>
    </div>
  );
};

export default DrawBoardComponent;
