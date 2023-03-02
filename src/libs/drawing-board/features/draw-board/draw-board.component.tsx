import React, { useEffect, useState } from 'react';
import ColorPickerComponent from './color-picker/color-picker.component';
import DrawCanvasComponent from './draw-canvas/draw-canvas.component';
import ImageViewComponent from '../../components/image-view/image-view.component';
import { RoomService } from '../../services/room.service';
import './draw-board.style.css';
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

  // useEffect(() => {
  //   imageData?.dataURL && roomService.sendSync(imageData.dataURL);
  // }, [imageData]);
  return (
    <div className={className}>
      <ColorPickerComponent
        className="draw-board-toolbar-wrapper"
        color={penColor}
        setColor={setPenColor}
      ></ColorPickerComponent>
      <DrawCanvasComponent
        roomService={roomService}
        setImageData={setImageData}
        penColor={penColor}
        penWidth={1}
      ></DrawCanvasComponent>
      <ImageViewComponent imageData={imageData?.dataURL}></ImageViewComponent>
    </div>
  );
};

export default DrawBoardComponent;
