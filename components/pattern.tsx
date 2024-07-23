import { type ButtonHTMLAttributes } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store-hooks";
import { type ChangePatternsPayload } from "@/lib/types";
import { changePatternColor, changePatterns } from "@/lib/redux/pet-constructor-slice";
import { Button } from "./ui/button";


interface PatternProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: ChangePatternsPayload;
}

const Pattern = ({ data, ...props }: PatternProps) => {
  const dispatch = useAppDispatch();

  const patternColorPickerState = useAppSelector((state) => state.patternColorPicker);
  const { color } = patternColorPickerState;


  const onClick = () => {
    dispatch(changePatterns(data));
    dispatch(changePatternColor({ part: data.pattern.part, patternID: data.pattern.id, color }));
  };

  return (
    <Button variant='outline' {...props} onClick={onClick} >{data.pattern.id}</Button>
  );
};
export default Pattern;
