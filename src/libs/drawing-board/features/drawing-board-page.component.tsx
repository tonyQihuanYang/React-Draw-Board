import React from 'react';
import { useState } from 'react';
import CanvasComponent from './canvas/canvas.component';
import ColorPickerComponent from './color-picker/color-picker.component';
const DrawingBoardPageComponent = () => {
  const [penColor, setPenColor] = useState('#000000');

  return (
    <div style={{ display: 'block', overflow: 'hidden' }}>
      <ColorPickerComponent
        color={penColor}
        setColor={setPenColor}
      ></ColorPickerComponent>
      <CanvasComponent penColor={penColor}></CanvasComponent>
    </div>
  );
};

export default DrawingBoardPageComponent;
