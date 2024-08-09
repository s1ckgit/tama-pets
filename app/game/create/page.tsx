'use client';

import { useEffect, useRef } from "react";

import PetPartsPicker from "@/components/constructor/parts/pet-parts-picker";
import ColorsSelection from "@/components/constructor/parts/colors-selection";
import PatternsSelection from "@/components/constructor/patterns/patterns-selection";
import PatternsColorSelection from "@/components/constructor/patterns/patterns-color-selection";

import manifest from '@/manifest.json';

import { usePetConstructor } from "@/lib/hooks/use-pet-constructor";
import ColorsHistorySection from "@/components/constructor/colors-history-section";
import ConstructorInterface from "@/components/constructor/constructor-interface";
import { useAppInit } from "@/lib/hooks/use-app-init";


const Canvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const { app, appIsStarted } = useAppInit({ manifest, canvasRef });
  const { drawPet, removePet, petContainer } = usePetConstructor();

  useEffect(() => {
    if(appIsStarted) {
      const { width, height } = app.screen;
      const stage = app.stage;

      drawPet({ width, height });
      stage.addChild(petContainer);
      
      return () => {
        removePet();

        if(stage) {
          stage.removeChild(petContainer);
        }
      };  
    }
  }, [appIsStarted, drawPet, petContainer, removePet, app]);

  return (
    <div className='grid grid-cols-[1fr,minmax(500px,500px),1fr] [grid-template-areas:"subgrid-1_subgrid-2_subgrid-3"] gap-3 p-3'>
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
          <ColorsHistorySection />
        </div>

        <div className='tama-container [grid-area:game] relative p-[10px] flex items-center justify-center max-h-[660px]' ref={canvasRef}>
          {appIsStarted && (
            <ConstructorInterface />
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
