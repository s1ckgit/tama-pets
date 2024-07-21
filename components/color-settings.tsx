import type { PartType, PetConstructorState } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";

interface ColorSettingsProps { 
  color: string, 
  constructorState: PetConstructorState, 
  setter: Dispatch<SetStateAction<PartType | null>> 
}


const ColorSettings = ({ constructorState, setter }: ColorSettingsProps) => {
  const parts = Object.keys(constructorState) as PartType[];

  return (
    <div className="flex flex-col gap-y-5 align-middle w-full">
      {
        parts.map((part) => {
          const partState = constructorState[part];
          if(!Array.isArray(partState)) {
            return (
              <button
                onClick={() => setter(part)}
                key={partState.id}
              >
                {part}
              </button>
            );
          }
        })
      }
    </div>
  );
};
export default ColorSettings;
