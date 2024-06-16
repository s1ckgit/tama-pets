'use client';

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as Pixi from 'pixi.js';

import { changeVision } from "@/lib/redux/pet-constructor-slice";
import { type AppDispatch } from "@/lib/redux/store";
import { usePetConstructor } from "@/lib/hooks/use-pet-constructor";
import manifest from '@/manifest.json';
import { BabyCatHeadEnum } from "@/lib/assets-info";

const Canvas = () => {
  const [appIsStarted, setAppIsStarted] = useState(false);

  const appRef = useRef<Pixi.Application>();
  const canvasRef = useRef<HTMLDivElement>(null);
  const middleXCoords = useRef<number>(0);
  const middleYCoords = useRef<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  const { drawPet, removePet, petContainer, petProps } = usePetConstructor();

  useEffect(() => {
    const initApp = async () => {
      const app = new Pixi.Application();
      try {
        await app.init({ backgroundColor: 0xf2f2f2 });
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
    <>
      <div ref={canvasRef}></div>
      <button onClick={() => {
        const headValue = petProps.head.value;
        let newValue;
        if (headValue === 4) {
          newValue = 1;
        } else {
          newValue = headValue + 1;
        }

        const newHead = BabyCatHeadEnum[newValue];

        dispatch(changeVision(newHead));
      }}>Сменить башку</button>
    </>
  );
};

export default Canvas;
