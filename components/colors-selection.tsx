import { HexColorPicker } from "react-colorful";
import ColorSettings from "./color-settings";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import { changePartColor } from "@/lib/redux/pet-constructor-slice";

import { changeColor } from '@/lib/redux/color-picker-slice';

const ColorsSelection = () => {
  const dispatch = useAppDispatch();
  const colorPickerState = useAppSelector((state) => state.colorPicker);
  const { color, partToPaint } = colorPickerState;
  
  const onColorChange = (e: string) => {
    dispatch(changeColor(e));
    if(partToPaint) {
      dispatch(changePartColor({ part: partToPaint, color }));
    }
  };
  
  return (
    <div className="flex gap-4 w-full h-full">
      <HexColorPicker color={color} onChange={onColorChange} style={{ height: '100%', width:'50%' }}/>
      <ColorSettings />
    </div>
  );
};
export default ColorsSelection;
