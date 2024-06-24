'use client';

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as Pixi from 'pixi.js';
import { HexColorPicker } from "react-colorful";

import { changeVision } from "@/lib/redux/pet-constructor-slice";
import { type AppDispatch } from "@/lib/redux/store";
import { usePetConstructor } from "@/lib/hooks/use-pet-constructor";
import manifest from '@/manifest.json';
import { BabyCatHeadEnum } from "@/lib/assets-info";

import styles from './canvas.module.css';

import CAT from '@/public/cat.svg';
import PATTERN from '@/public/assets/baby-cat/tail-patterns/pattern-1-mask.svg';

const Canvas = () => {
  const [appIsStarted, setAppIsStarted] = useState(false);
  const [color, setColor] = useState<string>('#000000');

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
        await app.init({ backgroundColor: 0xf2f2f2, width: 480, height: 640 });
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
    <div className={styles.grid}>
      <div className={styles['subgrid-1']}>
        <div className={styles.colors}>
          <HexColorPicker color={color} onChange={setColor} style={{ width: '50%', height: '100%' }}/>
          <div className={styles['color-story']}></div>
        </div>
        <div>
        </div>
      </div>
      <div className={styles['subgrid-2']}>
        <div>story</div>
        <div className={styles.game} ref={canvasRef}></div>
      </div>
      <div className={styles['subgrid-3']}>
        <div>patterns</div>
        <div>hujnya kakaya-to</div>
      </div>

      
    </div>
  );
};

export default Canvas;
