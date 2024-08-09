import ColorsHistoryButton from "./colors-history-button";
import { useAppSelector } from "@/lib/hooks/store-hooks";

import type { PartType } from "@/lib/types";

const ColorsHistorySection = () => {
  const petConstructorState = useAppSelector((state) => state.petConstructor);
  const parts = Object.keys(petConstructorState) as PartType[];

  return (
    parts.map((part) => {
      const partState = petConstructorState[part];
      const patterns = Array.from(partState.patterns);

      if(partState.color) {
        return (
          <>
            <ColorsHistoryButton key={part} color={partState.color} />
            {patterns.map(([id, pattern]) => {
              return <ColorsHistoryButton key={id} color={pattern.color} />;
            })}
          </>
        );
      }
    })
  );
};
export default ColorsHistorySection;
