import React, { useState } from 'react';
import ColorPickerComponent from './color-picker/color-picker.component';
import DrawCanvasComponent from './draw-canvas/draw-canvas.component';
import ImageViewComponent from '../../components/image-view/image-view.component';
import { RoomService } from '../../services/room.service';

const DrawBoardComponent = ({
  roomService,
  className,
}: {
  roomService: RoomService;
  className?: string;
}) => {
  const [penColor, setPenColor] = useState('#000000');
  const [imageData, setImageData] = useState<{
    imageData: ImageData;
    arrayBuffer: ArrayBuffer;
    dataURL: string;
  }>();

  return (
    <div className={className} style={{ display: 'block', overflow: 'hidden' }}>
      <ColorPickerComponent
        color={penColor}
        setColor={setPenColor}
      ></ColorPickerComponent>
      <div>
        <DrawCanvasComponent
          roomService={roomService}
          setImageData={setImageData}
          penColor={penColor}
          penWidth={1}
        ></DrawCanvasComponent>
        <ImageViewComponent imageData={imageData?.dataURL}></ImageViewComponent>
      </div>
    </div>
  );
};

export default DrawBoardComponent;
