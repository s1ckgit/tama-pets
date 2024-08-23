import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ColorConfirmation from "@/components/constructor/color-confirmation";
import PatternToPaint from "./pattern-to-paint";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import { changePatternToPaint, changeColor } from '@/lib/redux/pattern-color-picker-slice';
import { changePatternColor } from "@/lib/redux/pet-constructor-slice";

import type { PartType, PatternsPayload } from "@/lib/types";
import { partsDictionary } from "@/lib/parts-dictionary";

interface ActivePatternsInterface {
  part: PartType,
  patterns: Map<number, PatternsPayload>
}

const PatternColorSettings = () => {
  const dispatch = useAppDispatch();
  const constructorState = useAppSelector((state) => state.petConstructor);
  const patternColorPickerState = useAppSelector((state) => state.patternColorPicker);
  const { patternToPaint, cancelColor } = patternColorPickerState;
  const parts = Object.keys(constructorState) as PartType[];
  
  const activePatterns = [] as ActivePatternsInterface[];

  for(const part of parts) {
    const patterns = constructorState[part].patterns;
    if(patterns.size > 0) {
      activePatterns.push({
        part,
        patterns
      });
    }
  }

  return activePatterns.length > 0 ? (
    <Tabs defaultValue={activePatterns.length > 0 ? activePatterns[0].part : '' } className="w-full">
      <TabsList className="flex">
        {
          activePatterns.map((item) => {
            return (
              <TabsTrigger className="basis-full" value={`${item.part}`} key={item.part}>
                {
                  partsDictionary[item.part]
                }
              </TabsTrigger>
            );
          })
        }
      </TabsList>
      
      {
        patternToPaint && (
          <ColorConfirmation 
            confirmFunc={() => dispatch(changePatternToPaint(undefined))} 
            cancelFunc={() => {
              dispatch(changeColor(cancelColor!));
              dispatch(changePatternToPaint(undefined));
              dispatch(changePatternColor({ part: patternToPaint.part, patternID: patternToPaint.patternID, color: cancelColor! }));
            }}
          />
        )
      }

      {
        !patternToPaint && activePatterns.map((item) => {
          return (
            <TabsContent className="grid grid-cols-3 auto-rows-[75px] gap-2 overflow-y-auto h-[166px]" key={item.part} value={`${item.part}`}>
              {
                Array.from(item.patterns.entries()).map(([id, pattern]) => {
                  return (
                    <PatternToPaint key={id} data={{ pattern }} />
                  );
                })
              }
            </TabsContent>
          );
        })
      }
    </Tabs>
  ) : 
  <h3 className="w-full text-center">Выберите один из паттернов из списка ниже</h3>;
  
};
export default PatternColorSettings;
