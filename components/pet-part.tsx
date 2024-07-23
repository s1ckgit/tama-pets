import { type ButtonHTMLAttributes } from "react";

import { useAppDispatch } from "@/lib/hooks/store-hooks";
import { type ChangeVisionPayload } from "@/lib/types";
import { changeVision } from "@/lib/redux/pet-constructor-slice";
import { Button } from "./ui/button";


interface PetPartProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: ChangeVisionPayload;
  variant: 'history' | 'default'
}

const PetPart = ({ data, variant, ...props }: PetPartProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(changeVision(data));
  };

  return (
    <>
      {variant === 'history' && (
        <Button size='sm' {...props} onClick={onClick}>{data.name}</Button>
      )}
      {variant === 'default' && (
        <Button variant='outline' {...props} onClick={onClick} >{data.name}</Button>
      )}
    </>
  );
};
export default PetPart;
