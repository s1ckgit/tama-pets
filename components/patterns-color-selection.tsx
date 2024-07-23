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
      <HexColorPicker color={color} onChange={onColorChange} style={{ width: '50%', height: '100%' }}/>
      <div className='w-[50%]'>
        <PatternColorSettings />
      </div>
    </div>
  );
};
export default PatternsColorSelection;
