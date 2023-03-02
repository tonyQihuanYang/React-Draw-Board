import React from 'react';
import { MuiColorInput } from 'mui-color-input';

interface ColorPickerComponentProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPickerComponent = ({
  color,
  setColor,
}: ColorPickerComponentProps) => {
  const handleChange = (color: any) => {
    console.log('Setting Color to ', color);
    setColor(color);
  };

  return <MuiColorInput value={color} onChange={handleChange} />;
};

export default ColorPickerComponent;
