import Image from "next/image";
import Link from "next/link";

import LOGO from '@/public/logos/header-logo.svg?url';

import LogoutButton from "./logout-button";
import { auth } from "@/auth";

const MainHeader = async () => {
  const session = await auth();

  return (
    <header className={'grid grid-cols-[135px,auto] py-12 px-6 items-center bg-transparent absolute top-0 z-50 w-full h-[150px] 2xl:px-16'}>
        <Link href='/'> 
          <Image width={135} height={55} alt='logo' src={LOGO}></Image>
        </Link>
        <nav className='flex w-full justify-between px-8 align-middle text-center 2xl:justify-evenly'>

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
