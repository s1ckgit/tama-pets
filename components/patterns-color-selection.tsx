import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import { changePatternColor } from "@/lib/redux/pet-constructor-slice";
import type { ChangePatternColorPayload } from "@/lib/types";
import { SetStateAction, useState } from "react";
import { HexColorPicker } from "react-colorful";
import PatternColorSettings from "./pattern-color-settings";

const PatternsColorSelection = () => {
  const dispatch = useAppDispatch();
  const constructorState = useAppSelector((state) => state.petConstructor);

  const [color, setColor] = useState<string>('#000000');
  const [patternToPaint, setPatternToPaint] = useState<Omit<ChangePatternColorPayload, 'color'> | null>(null);

  const onColorChange = (e: SetStateAction<string>) => {
    setColor(e);
    if(patternToPaint) {
      dispatch(changePatternColor({ part: patternToPaint.part, patternID: patternToPaint.patternID, color }));
    }
  };

  return (
    <>
      <HexColorPicker color={color} onChange={onColorChange} style={{ width: '50%', height: '100%' }}/>
      <div className='w-[50%]'>
        <PatternColorSettings setter={setPatternToPaint} constructorState={constructorState} color={color} />
      </div>
    </>
  );
};
export default PatternsColorSelection;
