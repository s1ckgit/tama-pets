import { partsDictionary } from "@/lib/parts-dictionary";
import type { PartType } from "@/lib/types";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import { changePartColor } from "@/lib/redux/pet-constructor-slice";

import { CANCEL_ICON, CONFIRM_ICON } from "@/lib/icons";

import { changeCancelColor, changeColor, changePartToPaint } from '@/lib/redux/color-picker-slice';


const ColorSettings = () => {
  const dispatch = useAppDispatch();
  const constructorState = useAppSelector((state) => state.petConstructor);
  const colorPickerState = useAppSelector((state) => state.colorPicker);
  const { partToPaint, cancelColor, color } = colorPickerState;

  const parts = Object.keys(constructorState) as PartType[];

  return (
    <div className="flex flex-col gap-y-2 w-[100%]">
      {
        partToPaint && (
          <div className="w-full flex flex-col items-center gap-2">
            <h3>Приенить этот цвет?</h3>
            <div className="flex gap-2">
              <Button
                className="hover:bg-transparent"
               variant='ghost' 
               onClick={() => dispatch(changePartToPaint(undefined))} 
               size='icon'>
                <CONFIRM_ICON />
              </Button>
              <Button
                className="hover:bg-transparent"
                variant='ghost' 
                onClick={() => {
                  dispatch(changeColor(cancelColor!));
                  dispatch(changePartToPaint(undefined));
                  dispatch(changePartColor({ part: partToPaint, color: cancelColor! }));
                }} 
                size='icon'
              >
                <CANCEL_ICON />
              </Button>
            </div>
          </div>
        )
      }
      {
        !partToPaint && parts.map((part) => {
          const partState = constructorState[part];
            if(partState.color) {
              return (
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => {
                    dispatch(changePartToPaint(part));
                    dispatch(changeCancelColor(partState.color));
                    dispatch(changePartColor({ part, color }));
                  }}
                  key={partState.id}
                >
                  {
                    partsDictionary[part]
                  }
                </Button>
              );
            }
        })
      }
    </div>
  );
};
export default ColorSettings;
