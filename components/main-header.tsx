'use client';

import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import { motion } from "framer-motion";

import LOGO from '@/public/logos/header-logo.svg?url';

import LogoutButton from "./logout-button";

const MainHeader = ({ session }: { session: Session | null } ) => {
  
  return (
    <motion.header initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 1 }} className={'grid grid-cols-[135px,auto] py-12 px-6 items-center bg-transparent absolute top-0 z-50 w-full h-[150px] 2xl:px-16'}>
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
      </motion.header>
  );
};
export default MainHeader;
