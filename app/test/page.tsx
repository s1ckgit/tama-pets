'use client';

import * as Pixi from 'pixi.js';

import { useAppInit } from "@/lib/hooks/use-app-init";
import { useEffect, useRef } from "react";

import manifest from '@/manifest.json';

const TestPage = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const { app, appIsStarted } = useAppInit({ manifest, canvasRef });

  useEffect(() => {
    const init = async () => {
      if(appIsStarted) {
        const bundle = await Pixi.Assets.loadBundle('test');
        const testSprite = bundle['test-spritesheet'];

        const animatedSprite = new Pixi.AnimatedSprite(testSprite['animations']['walk']);
        
        const overlayTexture = bundle['texture'] as Pixi.Texture;

        animatedSprite.animationSpeed = 0.1;
        animatedSprite.scale.set(5);

        animatedSprite.play();

        app.stage.addChild(animatedSprite);
      }
    };
    init();


  }, [appIsStarted, app]);


  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div ref={canvasRef}></div>
    </div>
  );
};
export default TestPage;
