import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider delayDuration={700}>
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
                  <Tooltip key={partState.id}>
                    <TooltipTrigger asChild>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => {
                          dispatch(changePartToPaint(part));
                          dispatch(changeCancelColor(partState.color));
                          dispatch(changePartColor({ part, color }));
                        }}
                      >
                        {
                          partsDictionary[part]
                        }
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side='right'>
                        Нажмите, чтобы выбрать часть тела, которую хотите покрасить
                    </TooltipContent>
                  </Tooltip>
                );
              }
          })
        }
      </div>
    </TooltipProvider>
  );
};
export default ColorSettings;
