'use client';

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import MAINCAT from '@/public/pets/main-cat.svg?url';
import Typewriter from "@/components/type-writer";

import { motion } from 'framer-motion';
import { useCallback, useState } from "react";

export default function Home() {
  const [startRendering, setStartRendering] = useState(false);
  const [typingIsDone, setTypingIsDone] = useState(false);
  const [skippedText, setSkippedText] = useState<string | null>(null);
  const [showSkipButton, setShowSkipButton] = useState(true);

  const onSkip = async () => {
    const res = await fetch('/api/dialog-stream', {
      method: 'POST'
    });

    const text = await res.text();

    setSkippedText(text);
    setTypingIsDone(true);
    setShowSkipButton(false);
  };

  const onEnd = useCallback(() => {
    setTypingIsDone(true);
    setShowSkipButton(false);
  }, []);
  
  return (
    <main className="pt-[150px] px-6">
      <div className='grid w-full grid-cols-1 md:grid-cols-[1fr,1fr] md:justify-items-center'>
        <motion.div initial={{ left: -1000, opacity: 0 }} transition={{ duration: 1 }} animate={{ left: 0, opacity: 1 }} className='relative flex items-center justify-self-end'>
          <Image className="md:min-w-[300px]" alt='main cat nya :3' src={MAINCAT} width={500}></Image>
        </motion.div>
        <div className='relative p-10 rounded-3xl flex flex-col max-w-[720px] md:justify-self-start'>

          <motion.p onAnimationComplete={() => setStartRendering(true)} initial={{ opacity: 0 }} transition={{ duration: 0.4, delay: 1 }} animate={{ opacity: 1 }} className="dialog">

            {showSkipButton && <Button className="w-min absolute top-2 right-2" variant='outline' size='sm' onClick={onSkip}>Пропустить</Button>}

            {startRendering && !skippedText && <Typewriter onEnd={onEnd} url="/dialog-stream"/>}

            {skippedText && <span>{skippedText}</span>}


          </motion.p>

          <motion.div initial={{ opacity: 0, visibility: 'hidden' }} animate={ typingIsDone ? { visibility: 'visible', opacity: 1 } : {}} transition={{ duration: 1 }}>
            <Button asChild className='mt-8 z-0' size='mainPage' variant='mainPage'>
              <Link className="text-white" href='/game/create'>✨Создать питомца✨</Link>
            </Button>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
