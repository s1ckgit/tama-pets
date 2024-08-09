import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import { changePatternColor } from "@/lib/redux/pet-constructor-slice";
import { HexColorPicker } from "react-colorful";
import PatternColorSettings from "./pattern-color-settings";

import { changeColor } from '@/lib/redux/pattern-color-picker-slice';

const PatternsColorSelection = () => {
  const dispatch = useAppDispatch();
  const patternColorPickerState = useAppSelector((state) => state.patternColorPicker);
  const { color, patternToPaint } = patternColorPickerState;

  const onColorChange = (e: string) => {
    dispatch(changeColor(e));
    if(patternToPaint) {
      dispatch(changePatternColor({ part: patternToPaint.part, patternID: patternToPaint.patternID, color }));
    }
  };

  return (
    <div className="flex gap-4 w-full h-full">
      <HexColorPicker className="data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 transition-opacity" data-disabled={!patternToPaint} color={color} onChange={onColorChange} style={{ width: '100%', height: '100%' }}/>
      <PatternColorSettings />
    </div>
  );
};
export default PatternsColorSelection;
