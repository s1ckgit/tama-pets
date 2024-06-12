import { signIn } from "@/auth";

import Image from "next/image";

import { cn } from "@/lib/utils/cn";

import MAINCAT from '@/public/pets/main-cat.svg';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className={cn('flex w-full')}>
        <div className={cn('w-[50%] relative min-h-[1000px]')}>
          <Image className={cn('w-full')} alt='main cat nya :3' src={MAINCAT} fill={true}></Image>
        </div>
        <div className={cn('relative w-[50%] bg-[#D9D9D9] h-max p-32 rounded-[78px] pseudo-dialog')}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit culpa impedit dignissimos facere quos assumenda est, maxime inventore nam, cumque ab debitis laborum fugit. Iste exercitationem illum iusto enim autem!
            Voluptatum voluptatem odio quibusdam accusamus commodi minima similique facere voluptate expedita harum recusandae voluptas voluptates ab reiciendis, dolore vero laboriosam placeat. Nobis praesentium asperiores eius unde tempore facilis quis fugit.
            Magnam alias consequuntur doloremque optio at. Autem ab laboriosam omnis quo debitis quos numquam velit voluptate, deleniti neque nihil sint aliquid quaerat est! Iste odit nisi reiciendis repudiandae nam eveniet!
            Animi quos odit, asperiores obcaecati pariatur mollitia ullam totam accusantium harum? Deleniti dignissimos quo est? Commodi minima blanditiis beatae dignissimos nostrum ratione neque, architecto corporis sit rerum eligendi earum aspernatur?
          </p>
        </div>
      </div>
      <Button className={cn('mb-8')} size='mainPage' variant='mainPage'>✨Создать питомца✨</Button>
    </main>
  );
}
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      } }
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
