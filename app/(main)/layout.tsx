import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";

import LOGO from '@/public/logos/header-logo.svg';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn('mx-auto max-w-[1200px]')}>
      <header className={cn('grid grid-cols-2 grid-cols-header pt-8 pb-12')}>
        <Link href='/'>
          <Image width={135} height={55} alt='logo' src={LOGO}></Image>
        </Link>
        <nav className={cn('flex w-full')}>
          <ul className={cn('flex justify-evenly align-middle text-center w-full')}>
            <li>
              <Link href='/'>Главная</Link>
            </li>
            <li>
              <Link href='/about'>Об игре</Link>
            </li>
            <li>
              <Link href='/login'>Вход</Link>
            </li>
            <li>
              <Link href='/register'>Регистрация</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>

  );
};
export default MainLayout;
