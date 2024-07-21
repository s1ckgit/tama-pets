import { HexColorPicker } from "react-colorful";
import ColorSettings from "./color-settings";
import { SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import { changePartColor } from "@/lib/redux/pet-constructor-slice";
import { PartType } from "@/lib/types";

const ColorsSelection = () => {
  const dispatch = useAppDispatch();
  const constructorState = useAppSelector((state) => state.petConstructor);

  const [color, setColor] = useState<string>('#000000');
  const [partToPaint, setPartToPaint] = useState<PartType | null>(null);
  
  const onColorChange = (e: SetStateAction<string>) => {
    setColor(e);
    if(partToPaint) {
      dispatch(changePartColor({ part: partToPaint, color }));
    }
  };
  
  return (
    <>
      <HexColorPicker color={color} onChange={onColorChange} style={{ width: '50%', height: '100%' }}/>
      <div className='w-[50%]'>
        <ColorSettings setter={setPartToPaint} constructorState={constructorState} color={color} />
      </div>
    </>
  );
};
export default ColorsSelection;
