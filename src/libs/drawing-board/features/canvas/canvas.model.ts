import { CanvasCoordinate, DrawPoint } from '../models/DrawPoint.model';

export interface CanvasComponentProps {
  penColor: string;
  setDrawPoint: React.Dispatch<React.SetStateAction<DrawPoint | null>>;
  setPermanentCancas: React.Dispatch<React.SetStateAction<any>>;
  syncDrawPoint: DrawPoint | null;
}
