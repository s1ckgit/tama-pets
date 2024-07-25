import { useAppDispatch } from "@/lib/hooks/store-hooks";
import { Button } from "./ui/button";

import { useDebounce } from 'use-debounce';

import { changeColor } from '@/lib/redux/color-picker-slice';
import { changeColor as changePatternColor } from '@/lib/redux/pattern-color-picker-slice';


const ColorsHistoryButton = ({ color }: { color: string }) => {
  const dispatch = useAppDispatch();

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
