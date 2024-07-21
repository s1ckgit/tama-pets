import { type ButtonHTMLAttributes } from "react";

import { useAppDispatch } from "@/lib/hooks/store-hooks";
import { type ChangePatternsPayload } from "@/lib/types";
import { changePatterns } from "@/lib/redux/pet-constructor-slice";


interface PatternProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: ChangePatternsPayload;
  variant: 'history' | 'default'
}

const Pattern = ({ data, variant, ...props }: PatternProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(changePatterns(data));
  };

  return (
    <>
      {variant === 'history' && (
        <button {...props} onClick={onClick} className="w-auto h-6 bg-blue-500 text-zinc-50">{data.pattern.id}</button>
      )}
      {variant === 'default' && (
        <button {...props} onClick={onClick} className="w-auto h-12 bg-blue-500 text-zinc-50">{data.pattern.id}</button>
      )}
    </>
  );
};
export default Pattern;
