'use client';

import { useEffect, useRef, useState } from "react";
import * as Pixi from 'pixi.js';
import { useSession } from "next-auth/react";

import { usePetConstructor } from "@/lib/hooks/use-pet-constructor";

import PetPartsPicker from "@/components/pet-parts-picker";
import ColorsSelection from "@/components/colors-selection";
import PatternsSelection from "@/components/patterns-selection";
import PatternsColorSelection from "@/components/patterns-color-selection";
import ColorsHistoryButton from "@/components/colors-history-button";
import { useAppSelector } from "@/lib/hooks/store-hooks";
import type { PartType } from "@/lib/types";

import manifest from '@/manifest.json';
import { Button } from "@/components/ui/button";
import { createPet } from "@/actions/pets";
import { Input } from "@/components/ui/input";


const Canvas = () => {
  const petConstructorState = useAppSelector((state) => state.petConstructor);
  const parts = Object.keys(petConstructorState) as PartType[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [appIsStarted, setAppIsStarted] = useState(false);
  const [name, setName] = useState('');

  const appRef = useRef<Pixi.Application>();
  const canvasRef = useRef<HTMLDivElement>(null);
  const middleXCoords = useRef<number>(0);
  const middleYCoords = useRef<number>(0);

  const { drawPet, removePet, petContainer } = usePetConstructor();

  async function onSave() {
    if(userId) {
    const appearanceData = JSON.stringify(petConstructorState);
    await createPet({ 
      appearance: appearanceData,
      userId,
      name
      });
    }
  }

  useEffect(() => {
    if(appIsStarted) {
      drawPet(middleXCoords.current, middleYCoords.current);
      appRef.current?.stage.addChild(petContainer);
      
      return () => {
        removePet();
        appRef.current?.stage.removeChild(petContainer);
      };
    }
  }, [appIsStarted, drawPet, petContainer, removePet]);

  useEffect(() => {
    const initApp = async () => {
      const app = new Pixi.Application();
      try {
        await app.init({ backgroundColor: 0x996666, width: 480, height: 640 });
        Pixi.Assets.init({ manifest });
        Pixi.Assets.backgroundLoadBundle('baby-cat');

        canvasRef.current?.appendChild(app.canvas);
        appRef.current = app;
        middleXCoords.current = appRef.current.screen.width / 2;
        middleYCoords.current = appRef.current.screen.height / 2;

        setAppIsStarted(true);


      } catch(e) {
        console.error(e);
      }

    };
    initApp();

    return () => {
      appRef.current?.canvas.remove();
      appRef.current?.destroy();
    };

  }, []);

  return (
    <div className='grid grid-cols-[1fr,minmax(520px,520px),1fr] [grid-template-areas:"subgrid-1_subgrid-2_subgrid-3"] gap-3 p-3'>
      <div className='grid grid-rows-[300px,auto] [grid-template-areas:"colors""forms"] [grid-area:subgrid-1] gap-3'>
        <div className='tama-container [grid-area:colors] flex flex-col gap-y-2 items-center'>
          <h2 className="">Что будем красить?</h2>
          <ColorsSelection />
        </div>
        <div className="tama-container [grid-area:forms] flex flex-col">
          <PetPartsPicker />
        </div>
      </div>
      <div className='grid grid-rows-[100px,auto] [grid-template-areas:"story""game"] [grid-area:subgrid-2] gap-3'>
        <div className="tama-container [grid-area:story] flex items-center gap-2 justify-evenly">
          {
            parts.map((part) => {
              const partState = petConstructorState[part];
              const patterns = Array.from(partState.patterns);

              if(partState.color) {
                return (
                  <>
                    <ColorsHistoryButton key={part} color={partState.color} />
                    {patterns.map(([id, pattern]) => {
                      return <ColorsHistoryButton key={id} color={pattern.color} />;
                    })}
                  </>
                );
              }
            })
          }
        </div>
        <div className='tama-container [grid-area:game] relative' ref={canvasRef}>
          {appIsStarted && (
            <Input className="absolute left-1/2 -translate-x-1/2 top-8 max-w-[300px]" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          {appIsStarted && (
            <Button className="absolute bottom-8 left-1/2 -translate-x-1/2">Сохранить</Button>
          )}
        </div>
      </div>
      <div className='grid [grid-template-rows:300px_auto] [grid-template-areas:"pattern-colors""patterns"] [grid-area: subgrid-3] gap-3'>
        <div className="tama-container [grid-area:pattern-colors] flex flex-col gap-3 items-center">
          <h2 className="">Какой паттерн будем красить?</h2>
          <PatternsColorSelection />
        </div>
        <div className="tama-container [grid-area:patterns]">
          <PatternsSelection />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
