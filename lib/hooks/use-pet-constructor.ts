import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import { Graphics, Assets, Container, Texture, Sprite } from 'pixi.js';

import { type RootState } from "@/lib/redux/store";

const createCenteredSprite = (texture: Texture, size = { width: 100, height: 100 }, coords = { x: 0, y: 0 }) => {
  const sprite = Sprite.from(texture);
  sprite.anchor.set(0.5);
  sprite.x = coords.x;
  sprite.y = coords.y;
  sprite.width = size.width;
  sprite.height = size.height;

  return sprite;
};

export const usePetConstructor = () => {
  const petProps = useSelector((state: RootState) => state.petConstructor);

  const petContainer = useMemo(() => {
    const container = new Container();
    return container;
  }, []);


  const drawPet = useCallback(async (middleX: number, middleY: number) => {
    const containerBase = new Sprite();
    containerBase.setSize(800, 600);
    containerBase.anchor.set(0.5);
    petContainer.x = middleX;
    petContainer.y = middleY;
    petContainer.addChild(containerBase);

    const { body, ears, brows, head, tail, whiskers } = petProps;
    const bundle = await Assets.loadBundle(`baby-${body}`);

    const bodySprite = createCenteredSprite(bundle[`baby-${body}-base-1`], { width: 251, height: 328 });
    const headSprite = createCenteredSprite(bundle[`baby-${body}-head-${head.value}`], { width: head.size.width, height: head.size.height }, { x: head.position.x, y: head.position.y });
    const earsSprite = createCenteredSprite(bundle[`baby-${body}-ears-${ears.value}`], { width: ears.size.width, height: ears.size.height }, { x: 270 + ears.size.width / 2 - middleX, y: 167 + ears.size.height / 2 - middleY });
    const browsSprite = createCenteredSprite(bundle[`baby-${body}-brows-${brows.value}`], { width: brows.size.width, height: brows.size.height }, { x: 329 + brows.size.width / 2 - middleX, y: 240 + brows.size.height / 2 - middleY });
    const tailSprite = createCenteredSprite(bundle[`baby-${body}-tail-${tail.value}`], { width: tail.size.width, height:tail.size.height });
    const whiskersSprite = createCenteredSprite(bundle[`baby-${body}-whiskers-${whiskers.value}`], { width: whiskers.size.width, height:whiskers.size.height }, { x: 225 + whiskers.size.width / 2 - middleX, y: 188 + whiskers.size.height / 2 - middleY });

    const tailPatternMask = createCenteredSprite(bundle['tail-pattern-1-mask'], { width: 101, height: 116 }, { x: 21, y: -27 });
    
    const tailContainer = new Container();
    tailContainer.x = 489 + tail.size.width / 2 - middleX;
    tailContainer.y = 294 + tail.size.height / 2 - middleY;

    const tailColor = new Graphics();
    tailColor.rect(21, -27, 101, 116).fill(0xff000);
    tailColor.pivot.set(50.5, 58);


    tailContainer.addChild(tailPatternMask);
    tailContainer.addChild(tailColor);
    tailContainer.addChild(tailSprite);
    tailColor.mask = tailPatternMask;


    petContainer.addChild(bodySprite);
    petContainer.addChild(headSprite);
    petContainer.addChild(earsSprite);
    petContainer.addChild(browsSprite);
    petContainer.addChild(tailContainer);
    petContainer.addChild(whiskersSprite);

    const bounds = petContainer.getLocalBounds();
    console.log('width', bounds.width, 'heigth', bounds.height);

  }, [petProps, petContainer]);

  const removePet = useCallback(() => {
    petContainer.removeChildren();
    petContainer.mask = null;
  }, [petContainer]);

  return { drawPet, removePet, petContainer, petProps };
};




