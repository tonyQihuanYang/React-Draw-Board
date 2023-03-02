import React from 'react';
import { MuiColorInput } from 'mui-color-input';

interface ColorPickerComponentProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const ColorPickerComponent = ({
  color,
  setColor,
  className,
}: ColorPickerComponentProps) => {
  const handleChange = (color: any) => {
    setColor(color);
  };

  return (
    <MuiColorInput
      style={{ position: 'absolute' }}
      className={className}
      value={color}
      onChange={handleChange}
    />
  );
};

export default ColorPickerComponent;
