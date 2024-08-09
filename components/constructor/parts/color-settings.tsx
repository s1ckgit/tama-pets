import { Button } from "../../ui/button";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import { changePartColor } from "@/lib/redux/pet-constructor-slice";
import { changeCancelColor, changeColor, changePartToPaint } from '@/lib/redux/color-picker-slice';

import { partsDictionary } from "@/lib/parts-dictionary";
import type { PartType } from "@/lib/types";
import ColorConfirmation from "@/components/constructor/color-confirmation";


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
          <ColorConfirmation 
            confirmFunc={() => {
              dispatch(changePartToPaint(undefined));
            }}
            cancelFunc={() => {
              dispatch(changeColor(cancelColor!));
              dispatch(changePartToPaint(undefined));
              dispatch(changePartColor({ part: partToPaint, color: cancelColor! }));
            }}
          />
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
