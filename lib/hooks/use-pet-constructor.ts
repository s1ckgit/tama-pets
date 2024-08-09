import { useCallback, useMemo } from "react";

import { Assets, Container } from 'pixi.js';

import { useAppSelector } from "@/lib/hooks/store-hooks";
import { type PatternMapType, type SpritesMapType, createPatternSprite, createSceneLayout, createSpriteForPetProp } from "@/lib/utils/pet-constructor-utils";

export const usePetConstructor = () => {
  const petProps = useAppSelector((state) => state.petConstructor);

  const petContainer = useMemo(() => {
    // Создаём контейнер для всех спрайтов пета
    const container = new Container();
    return container;
  }, []);


  const drawPet = useCallback(async ({ width, height }: { width: number, height: number }) => {
    
    // Создаём объект со всеми спрайтами
    const spritesMap = {} as SpritesMapType;

    const patternMap = {} as PatternMapType;

    // Создаём подложку для основного контейнера и центрируем его
    createSceneLayout({ width: 480, height: 640, middleX: width / 2, middleY: height / 2, container: petContainer });

    const { body } = petProps;
    const breed = `baby-${body.breed}`;
    // Загружаем бандл с ассетами для нужного пета  
    const bundle = await Assets.loadBundle(breed);

    const petPropsKeys = Object.keys(petProps);

    for(const key of petPropsKeys) {
      // Создаём спрайты для всех частей пета
      const prop =  petProps[key];
      const patterns = prop.patterns;
      const color = prop.color ?? null;
      createSpriteForPetProp({ propKey: key, prop, spritesMap, patternMap, bundle, breed, color });

      // Создаём спрайты для паттернов части пета
      patterns.forEach((pattern) => {
        createPatternSprite({ pattern, spritesMap, bundle, patternMap });
      });
    }

    for(const key in spritesMap) {
      // Добавляем все созданные спрайты в основной контейнер
      petContainer.addChild(spritesMap[key]);
    }

  }, [petProps, petContainer]);

  const removePet = useCallback(() => {
    petContainer.removeChildren();
    petContainer.mask = null;
  }, [petContainer]);

  return { drawPet, removePet, petContainer, petProps };
};




