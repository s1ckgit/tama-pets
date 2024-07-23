import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import type { PartType } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";

import { changePatternToPaint, changeColor, changeCancelColor } from '@/lib/redux/pattern-color-picker-slice';
import { CANCEL_ICON, CONFIRM_ICON } from "@/lib/icons";
import { changePatternColor } from "@/lib/redux/pet-constructor-slice";

const PatternColorSettings = () => {
  const dispatch = useAppDispatch();
  const constructorState = useAppSelector((state) => state.petConstructor);
  const patternColorPickerState = useAppSelector((state) => state.patternColorPicker);
  const { patternToPaint, cancelColor, color } = patternColorPickerState;
  const parts = Object.keys(constructorState) as PartType[];

  return (
    <Tabs className="w-auto">
      <TabsList className="flex">
        {
          parts.map((part) => {
            const partState = constructorState[part];

            if(partState.patterns.size > 0) {
              return (
                <TabsTrigger className="basis-full" value={`${partState.part}`} key={partState.id}>{partState.part}</TabsTrigger>
              );
            }

            return null;
          })
        }
      </TabsList>
      {
        patternToPaint && (
          <div className="w-full flex flex-col items-center gap-2">
            <h3>Приенить этот цвет?</h3>
            <div className="flex gap-2">
              <Button
                className="hover:bg-transparent"
               variant='ghost' 
               onClick={() => dispatch(changePatternToPaint(undefined))} 
               size='icon'>
                <CONFIRM_ICON />
              </Button>
              <Button
                className="hover:bg-transparent"
                variant='ghost' 
                onClick={() => {
                  dispatch(changeColor(cancelColor!));
                  dispatch(changePatternToPaint(undefined));
                  dispatch(changePatternColor({ part: patternToPaint.part, patternID: patternToPaint.patternID, color: cancelColor! }));
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
        !patternToPaint && parts.map((part) => {
          const partState = constructorState[part];

          if(partState.patterns.size > 0) {
            return (
              <TabsContent className="flex flex-wrap gap-2" key={partState.id} value={`${partState.part}`}>
                {
                  Array.from(partState.patterns.entries()).map(([id]) => {
                    return (
                      <Button
                        variant='outline'
                        key={id}
                        onClick={() => {
                          dispatch(changePatternToPaint({ part, patternID: id }));
                          dispatch(changeCancelColor(partState.patterns.get(id)!.color));
                          dispatch(changePatternColor({ part, patternID: id, color }));
                        }}
                      >
                        {id}
                      </Button>
                    );
                  })
                }
              </TabsContent>
            );
          }
        })
      }
    </Tabs>
  );
};
export default PatternColorSettings;
