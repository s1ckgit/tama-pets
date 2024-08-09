import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";

import LOGO from '@/public/logos/header-logo.svg?url';

const MainHeader = () => {
  return (
    <header className={cn('grid grid-cols-[135px,auto] py-12 px-6 items-center bg-transparent absolute top-0 z-50 w-full h-[150px]')}>
        <Link href='/'> 
          <Image width={135} height={55} alt='logo' src={LOGO}></Image>
        </Link>
        <nav className='flex w-full'>
          <ul className='flex justify-evenly align-middle text-center w-full'>
            <li>
              <Link href='/'>Главная</Link>
            </li>
            <li>
              <Link href='/about'>Об игре</Link>
            </li>
            <li>
              <Link href='/signin'>Вход</Link>
            </li>
            <li>
              <Link href='/signup'>Регистрация</Link>
            </li>
          </ul>
        </nav>
      </header>
  );
};
export default MainHeader;
