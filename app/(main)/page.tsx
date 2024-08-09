import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import MAINCAT from '@/public/pets/main-cat.svg?url';

export default function Home() {
  return (
    <main className="pt-[150px] px-6">
      <div className='flex w-full'>
        <div className='w-[50%] relative min-h-[1000px]'>
          <Image className='w-full' alt='main cat nya :3' src={MAINCAT} fill={true}></Image>
        </div>
        <div className='relative w-[50%] bg-[#D9D9D9] h-max p-32 rounded-[78px] pseudo-dialog'>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit culpa impedit dignissimos facere quos assumenda est, maxime inventore nam, cumque ab debitis laborum fugit. Iste exercitationem illum iusto enim autem!
            Voluptatum voluptatem odio quibusdam accusamus commodi minima similique facere voluptate expedita harum recusandae voluptas voluptates ab reiciendis, dolore vero laboriosam placeat. Nobis praesentium asperiores eius unde tempore facilis quis fugit.
            Magnam alias consequuntur doloremque optio at. Autem ab laboriosam omnis quo debitis quos numquam velit voluptate, deleniti neque nihil sint aliquid quaerat est! Iste odit nisi reiciendis repudiandae nam eveniet!
            Animi quos odit, asperiores obcaecati pariatur mollitia ullam totam accusantium harum? Deleniti dignissimos quo est? Commodi minima blanditiis beatae dignissimos nostrum ratione neque, architecto corporis sit rerum eligendi earum aspernatur?
          </p>
        </div>
      </div>
      <Button asChild className='mb-8' size='mainPage' variant='mainPage'>
        <Link href='/game/create'>✨Создать питомца✨</Link>
      </Button>
    </main>
  );
}
