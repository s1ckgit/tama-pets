import { useAppDispatch } from "@/lib/hooks/store-hooks";
import type { BodyPropType, PetConstructorProp } from "@/lib/types";
import { Button } from "./ui/button";

import { useDebounce } from 'use-debounce';

import { changeColor } from '@/lib/redux/color-picker-slice';
import { changeColor as changePatternColor } from '@/lib/redux/pattern-color-picker-slice';


const ColorsHistoryButton = ({ partState }: { partState: PetConstructorProp | BodyPropType }) => {
  const dispatch = useAppDispatch();

  const color = partState.color as string;
  const [debouncedColor] = useDebounce(color, 500);

  return (
    <Button 
      variant='outline'
      size='icon'
      style={{ backgroundColor: debouncedColor }}
      onClick={() => {
        dispatch(changeColor(debouncedColor));
        dispatch(changePatternColor(debouncedColor));
      }}
    />
  );
};
export default ColorsHistoryButton;
