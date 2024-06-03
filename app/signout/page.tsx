'use client';
import { logout } from "@/actions/user";

const SignOut = () => {
  return (
    <button onClick={() => logout()}>Выйти</button>
  );
};
export default SignOut;
