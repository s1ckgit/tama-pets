'use client';

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as Pixi from 'pixi.js';

import { changeBreed, changeColor, getRandomHexColor, getRandomBreed } from "@/lib/redux/pet-constructor-slice";
import { type AppDispatch } from "@/lib/redux/store";
import { assetsMap } from "@/public/assets/assetsMap";
import { usePetConstructor } from "@/lib/utils/use-pet-constructor";

const Canvas = () => {
  const [appIsStarted, setAppIsStarted] = useState(false);

  const appRef = useRef<Pixi.Application>();
  const canvasRef = useRef<HTMLDivElement>(null);
  const middleXCoords = useRef<number>(0);
  const middleYCoords = useRef<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  const { drawPet, removePet, petContainer } = usePetConstructor();

  useEffect(() => {
    const initApp = async () => {
      const app = new Pixi.Application();
      try {
        await app.init({ backgroundColor: 0x2e2e2e });
        canvasRef.current?.appendChild(app.canvas);
        appRef.current = app;
        middleXCoords.current = appRef.current.screen.width / 2;
        middleYCoords.current = appRef.current.screen.height / 2;

        setAppIsStarted(true);

        Pixi.Assets.addBundle('breed', assetsMap.sptites.breedBundle);
        Pixi.Assets.backgroundLoadBundle('breed');

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
      drawPet();
      petContainer.x = middleXCoords.current;
      petContainer.y = middleYCoords.current;
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
      <button onClick={() => dispatch(changeColor(getRandomHexColor()))}>Сменить цвет</button>
      <button onClick={() => dispatch(changeBreed(getRandomBreed()))}>Сменить расу</button>
    </>
  );
};

export default Canvas;
