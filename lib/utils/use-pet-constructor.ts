import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import * as Pixi from 'pixi.js';

import { type RootState } from "@/lib/redux/store";

export const usePetConstructor = () => {
  const PetCharacteristics = useSelector((state: RootState) => state.petConstructor);

  const { color, breed } = PetCharacteristics;

  const petContainer = useMemo(() => new Pixi.Container(), []);

  const drawPet = useCallback(async () => {
    const colorGraphics = new Pixi.Graphics() 
      .rect(0, 0, 500, 500)
      .fill(color);

    const breeds = await Pixi.Assets.loadBundle('breed');
    const petSprite = Pixi.Sprite.from(breeds[breed]);
    petContainer.mask = petSprite;
    petContainer.addChild(petSprite);
    petContainer.addChild(colorGraphics);

    petContainer.pivot.set(petContainer.width / 2, petContainer.height / 2);

  }, [color, breed, petContainer]);

  const removePet = useCallback(() => {
    petContainer.removeChildren();
    petContainer.mask = null;
  }, [petContainer]);

  return { drawPet, removePet, petContainer };
};




