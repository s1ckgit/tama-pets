import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import MAINCAT from '@/public/pets/main-cat.svg?url';

export default function Home() {
  return (
    <main className="pt-[150px] px-6">
      <div className='grid w-full grid-cols-1 md:grid-cols-[1fr,1fr] justify-items-center'>
        <div className='relative flex items-center'>
          <Image className="md:min-w-[300px]" alt='main cat nya :3' src={MAINCAT} width={500}></Image>
        </div>
        <div className='relative p-10 rounded-3xl flex flex-col'>
          <h1 className="text-center text-3xl">Добро пожаловать в Tama-Pets!</h1>

          <p className="leading-8 mt-5">

            Встречайте своего нового цифрового питомца и отправляйтесь в увлекательное путешествие по уходу и заботе о нем. В Tama-Pets вы можете:

            <span className="flex flex-col gap-y-4 pl-4 my-4">
              <span>Выращивать питомца: Заботьтесь о своем питомце, кормите его, играйте с ним и помогайте ему расти.</span>
              <span>Обновлять его облик: Персонализируйте своего питомца, меняя его внешний вид и аксессуары.</span>
              <span>Развлекаться вместе: Играйте в мини-игры и участвуйте в веселых событиях, чтобы укрепить связь с вашим питомцем.</span>
              <span>Общаться с друзьями: Поделитесь достижениями и питомцами с друзьями, и завоюйте призы за лучшие результаты.</span>
              <span>Ваш питомец будет зависеть от вас, так что будьте внимательны и заботливы! Узнайте, каково это быть настоящим другом для вашего цифрового компаньона.</span>
            </span>

            Начните приключение прямо сейчас и станьте лучшим другом для вашего пета!
          </p>
          <Button asChild className='mt-8' size='mainPage' variant='mainPage'>
            <Link href='/game/create'>✨Создать питомца✨</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
