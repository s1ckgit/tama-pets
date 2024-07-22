import { ChangePatternColorPayload, PartType, PetConstructorState } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Dispatch, SetStateAction } from "react";

interface PatternColorSettingsProps { 
  color: string, 
  constructorState: PetConstructorState, 
  setter: Dispatch<SetStateAction<Omit<ChangePatternColorPayload, 'color'> | null>> 
}

const PatternColorSettings = ({ constructorState, setter }: PatternColorSettingsProps) => {
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
        parts.map((part) => {
          const partState = constructorState[part];

          if(partState.patterns.size > 0) {
            return (
              <TabsContent key={partState.id} value={`${partState.part}`}>
                {
                  Array.from(partState.patterns.entries()).map(([id]) => {
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setter({
                            part,
                            patternID: id
                          });
                        }}
                      >
                        {id}
                      </button>
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
