import { Button } from "../../ui/button";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import { changePatternToPaint, changeCancelColor } from "@/lib/redux/pattern-color-picker-slice";
import { changePatternColor } from "@/lib/redux/pet-constructor-slice";

import type { PatternButtonProps } from "@/lib/types";
import { PATTERNSPREVIEWMAP } from "@/lib/icons";

const PatternToPaint = ({ data }: PatternButtonProps) => {
  const dispatch = useAppDispatch();
  const petConstructorState = useAppSelector((state) => state.petConstructor);
  const patternColorPickerState = useAppSelector((state) => state.patternColorPicker);

  const PreviewIcon = PATTERNSPREVIEWMAP.get(data.pattern.id)!;

  const { part, id } = data.pattern;
  const { color } = patternColorPickerState;

  const partState = petConstructorState[part];

  return (
    <Button
      className="h-full"
      variant='outline'
      onClick={() => {
        dispatch(changePatternToPaint({ part, patternID: id }));
        dispatch(changeCancelColor(partState.patterns.get(id)!.color));
        dispatch(changePatternColor({ part, patternID: id, color }));
      }}
    >
      <PreviewIcon className="w-12 h-12"/>
    </Button>
  );
};
export default PatternToPaint;
