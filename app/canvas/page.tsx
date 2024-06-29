'use client';

import { useEffect, useRef, useState } from "react";
import * as Pixi from 'pixi.js';
import { HexColorPicker } from "react-colorful";

import { usePetConstructor } from "@/lib/hooks/use-pet-constructor";
import manifest from '@/manifest.json';

import { BabyCatBrowsEnum, BabyCatHeadEnum } from "@/lib/assets-info";
import PetPart from "@/components/pet-part";
import HistoryPetPart from "@/components/history-pet-part";


const Canvas = () => {
  const [appIsStarted, setAppIsStarted] = useState(false);
  const [color, setColor] = useState<string>('#000000');

  const appRef = useRef<Pixi.Application>();
  const canvasRef = useRef<HTMLDivElement>(null);
  const middleXCoords = useRef<number>(0);
  const middleYCoords = useRef<number>(0);

  const { drawPet, removePet, petContainer } = usePetConstructor();

  useEffect(() => {
    const initApp = async () => {
      const app = new Pixi.Application();
      try {
        await app.init({ backgroundColor: 0xffffff, width: 480, height: 640 });
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
      appRef.current?.destroy();
      appRef.current?.canvas.remove();
    };

  }, []);

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

  return (
    <div className='grid [grid-template-columns:repeat(3,1fr)] [grid-template-areas:"subgrid-1_subgrid-2_subgrid-3"] gap-3 p-3'>
      <div className='grid [grid-template-rows:300px_auto] [grid-template-areas:"colors""forms"] [grid-area: subgrid-1] gap-3'>
        <div className='tama-container grid-area: colors'>
          <HexColorPicker color={color} onChange={setColor} style={{ width: '50%', height: '100%' }}/>
          <div className=''></div>
        </div>
        <div className="tama-container [grid-area: forms] flex flex-col">
          {BabyCatBrowsEnum.map((item) => <PetPart variant="default" data={item} key={item.name}/>)}
          {BabyCatHeadEnum.map((item) => <PetPart variant="default" data={item} key={item.name}/>)}
        </div>
      </div>
      <div className='grid [grid-template-rows:100px_auto] [grid-template-areas:"story""game"] [grid-area: subgrid-2] gap-3'>
        <div className="tama-container [grid-area: story]">
          <HistoryPetPart />
        </div>
        <div className='tama-container [grid-area: game]' ref={canvasRef}></div>
      </div>
      <div className='grid [grid-template-rows:300px_auto] [grid-template-areas:"paterns""hzpoka"] [grid-area: subgrid-3] gap-3'>
        <div className="tama-container [grid-area: patterns]"></div>
        <div className="tama-container [grid-area: hzpoka]"></div>
      </div>

      
    </div>
  );
};

export default Canvas;
