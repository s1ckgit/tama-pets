import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import type { PatternButtonProps } from "@/lib/types";
import { changePatternColor, changePatterns } from "@/lib/redux/pet-constructor-slice";
import { Button } from "./ui/button";
import { PATTERNSPREVIEWMAP } from "@/lib/icons";

const Pattern = ({ data, ...props }: PatternButtonProps) => {
  const dispatch = useAppDispatch();

  const patternColorPickerState = useAppSelector((state) => state.patternColorPicker);
  const { color } = patternColorPickerState;


  const onClick = () => {
    dispatch(changePatterns(data));
    dispatch(changePatternColor({ part: data.pattern.part, patternID: data.pattern.id, color }));
  };

  const PreviewIcon = PATTERNSPREVIEWMAP.get(data.pattern.id)!;

  return (
    <Button className="h-full" variant='outline' {...props} onClick={onClick} >
      <PreviewIcon className="w-12 h-12"/>
    </Button>
  );
};
export default Pattern;
