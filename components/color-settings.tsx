import { partsDictionary } from "@/lib/parts-dictionary";
import type { PartType, PetConstructorState } from "@/lib/types";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/lib/hooks/store-hooks";
import { changePartColor } from "@/lib/redux/pet-constructor-slice";

import { CANCEL_ICON, CONFIRM_ICON } from "@/lib/icons";

interface ColorSettingsProps { 
  constructorState: PetConstructorState, 
  partToPaint: PartType | null;
  color: string;
  setter: Dispatch<SetStateAction<PartType | null>>
  setColor: Dispatch<SetStateAction<string>>
}


const ColorSettings = ({ constructorState, setter, partToPaint, color, setColor }: ColorSettingsProps) => {
  const dispatch = useAppDispatch();

  const parts = Object.keys(constructorState) as PartType[];

  const [cancelColor, setCancelColor] = useState<string>('');

  return (
    <div className="flex flex-col gap-y-2 w-[50%]">
      {
        partToPaint && (
          <div className="w-full flex flex-col items-center gap-2">
            <h3>Приенить этот цвет?</h3>
            <div className="flex gap-2">
              <Button
                className="hover:bg-transparent"
               variant='ghost' 
               onClick={() => setter(null)} 
               size='icon'>
                <CONFIRM_ICON />
              </Button>
              <Button
                className="hover:bg-transparent"
                variant='ghost' 
                onClick={() => {
                  setColor(cancelColor);
                  setter(null);
                  dispatch(changePartColor({ part: partToPaint, color: cancelColor }));
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
                    setter(part);
                    setCancelColor(partState.color!);
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
