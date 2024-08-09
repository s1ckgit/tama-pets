'use client';

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LOADER_ICON } from "@/lib/icons";
import { savePetToDB } from "@/actions/pets";
import { CustomPrismaError } from "@/lib/types";
import { useAppSelector } from "@/lib/hooks/store-hooks";

const ConstructorInterface = () => {
  const petConstructorState = useAppSelector((state) => state.petConstructor);

  const [isLoading, setIsLoading] = useTransition();
  const [name, setName] = useState<string>('');
  const router = useRouter();

  async function onSave() {
    if(name.length < 2) {
      toast.error('Минимальная длина имени - 2 символа');
      return;
    }
    setIsLoading(async () => {
      const pet = await savePetToDB(petConstructorState, name);

      if(pet.error as CustomPrismaError) {
        if(pet.error.code === 'P2002') {
          toast.error('Ошибка: пет с таким именем уже существует');
          return;
        }
      }
      else {
        toast.success('Пет успешно создан!');
        router.replace('/game');
      }
    });
  }

  return (
    <>
    <div className="absolute left-1/2 -translate-x-1/2 top-8 w-[400px] flex gap-2 items-center">
      <p className="text-white">Имя: </p>
      <Input disabled={isLoading} className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <Button disabled={isLoading} onClick={onSave} className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40">
      {isLoading && <LOADER_ICON className="animate-spin" />}
      {!isLoading && 'Сохранить'}
    </Button>
  </>
  );
};
export default ConstructorInterface;
