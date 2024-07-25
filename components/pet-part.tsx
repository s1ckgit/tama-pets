import { type ButtonHTMLAttributes } from "react";

import { useAppDispatch } from "@/lib/hooks/store-hooks";
import { type ChangeVisionPayload } from "@/lib/types";
import { changeVision } from "@/lib/redux/pet-constructor-slice";
import { Button } from "./ui/button";

import { PREVIEWSMAP } from "@/lib/icons";


interface PetPartProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: ChangeVisionPayload;
  color?: string;
}

const PetPart = ({ data, color, ...props }: PetPartProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(changeVision(data));
  };
  const PreviewIcon = PREVIEWSMAP.get(data.id)!;
  const colorValue = color ?? 'currentColor';

  return (
    <Button className="h-full" variant='outline' {...props} onClick={onClick}>
      <PreviewIcon className="w-12 h-12" color={colorValue}/>
    </Button>
  );
};
export default PetPart;
