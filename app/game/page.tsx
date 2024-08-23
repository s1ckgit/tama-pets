'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks/store-hooks";
import { resetState } from "@/lib/redux/pet-constructor-slice";


const Game = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onExit = async () => {
    await signOut({ redirect: false });
    router.replace('/');
  };

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col gap-y-5 items-center justify-center px-2">
      <p>
        Спасибо, что протестировали демку моей игры. 
        Ваш персонаж сохранён в БД, как только первая играбельная версия игры будет доступна, вы сможете опробовать геймплей.
      </p>
      <div className="flex gap-x-2">
        <Button asChild>
          <Link href='/'>Главная</Link>
        </Button>
        <Button onClick={onExit}>Выйти</Button>
      </div>
    </div>
  );
};
export default Game;
