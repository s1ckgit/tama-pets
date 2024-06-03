'use client';

import { changePetsStats } from "@/actions/pets";
import { FormEventHandler } from "react";

const Page = () => {
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await changePetsStats('488efa57-14da-46ff-b168-22ab7e326b25', { 'hunger': 30, 'thirst': -10 } );
      console.log('pets stats changed');
    } catch(e) {
      console.error('failed to change pets stats', e);
    }
  };
  return (
    <form
    onSubmit={onSubmit}
    >
    <button type="submit">Change stats</button>
  </form>
  );
};
export default Page;
