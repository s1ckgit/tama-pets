'use client';

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";


const LogoutButton = ({ urlToRedirect }: { urlToRedirect?: string }) => {
  const router = useRouter();

  return (
    <Button size='min' onClick={async () => {
      await signOut();
      router.replace(urlToRedirect || '/');
    }}>Выйти</Button>
  );
};

export default LogoutButton;
