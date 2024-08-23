import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";

import LOGO from '@/public/logos/header-logo.svg?url';

import LogoutButton from "./logout-button";
import { auth } from "@/auth";

const MainHeader = async () => {
  const session = await auth();

  return (
    <header className={cn('grid grid-cols-[135px,auto] py-12 px-6 items-center bg-transparent absolute top-0 z-50 w-full h-[150px]')}>
        <Link href='/'> 
          <Image width={135} height={55} alt='logo' src={LOGO}></Image>
        </Link>
        <nav className='flex w-full justify-evenly align-middle text-center'>

          <Link href='/'>Главная</Link>
          <Link className="line-through" href=''>Об игре</Link>
          
          {
            !session ? (
              <>
                <Link href='/signin'>Войти</Link>
                <Link href='/signup'>Регистрация</Link>
              </>
            ) : (
              <LogoutButton />
            )
          }
          
        </nav>
      </header>
  );
};
export default MainHeader;
