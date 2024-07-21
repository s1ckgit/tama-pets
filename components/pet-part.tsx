import { type ButtonHTMLAttributes } from "react";

import { useAppDispatch } from "@/lib/hooks/store-hooks";
import { type ChangeVisionPayload } from "@/lib/types";
import { changeVision } from "@/lib/redux/pet-constructor-slice";


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
        <button {...props} onClick={onClick} className="w-auto h-6 bg-blue-500 text-zinc-50">{data.name}</button>
      )}
      {variant === 'default' && (
        <button {...props} onClick={onClick} className="w-auto h-12 bg-blue-500 text-zinc-50">{data.name}</button>
      )}
    </>
  );
};
export default PetPart;
