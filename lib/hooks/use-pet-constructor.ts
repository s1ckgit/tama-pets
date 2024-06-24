import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

import { Graphics, Assets, Container, Texture, Sprite } from 'pixi.js';

import { type RootState } from "@/lib/redux/store";

export const usePetConstructor = () => {
  const petProps = useSelector((state: RootState) => state.petConstructor);

  const petContainer = useMemo(() => {
    const container = new Container();
    return container;
  }, []);


  const drawPet = useCallback(async (middleX: number, middleY: number) => {
    const spritesMap = {} as { [key: string]: Container };

    const createCenteredSprite = (name: string, texture: Texture, size = { width: 100, height: 100 }, coords = { x: 0, y: 0 }) => {
      const sprite = Sprite.from(texture);
      sprite.anchor.set(0.5);
      sprite.width = size.width;
      sprite.height = size.height;

      if(name.startsWith('pattern')) {
        
        sprite.x = coords.x;
        sprite.y = coords.y;

        spritesMap[name] = sprite;
      } 
      else {
        const container = new Container();
  
        container.x = coords.x;
        container.y = coords.y;
  
        container.addChild(sprite);
      
        spritesMap[name] = container;
      }
    };

    const containerBase = new Sprite();
    containerBase.setSize(480, 640);
    containerBase.anchor.set(0.5);
    petContainer.x = middleX;
    petContainer.y = middleY;
    petContainer.addChild(containerBase);

    const { body, patterns } = petProps;
    const breed = body.breed;
    const bundle = await Assets.loadBundle(`baby-${breed}`);

    const petPropsKeys = Object.keys(petProps);

    for(const key of petPropsKeys) {
      const prop =  petProps[key];
      if(!Array.isArray(prop)) {
        createCenteredSprite(key, bundle[`baby-${breed}-${key}-${prop.value}`], { width: prop.size.width, height: prop.size.height }, { x: prop.position.x, y: prop.position.y });
      }
    }
    // createCenteredSprite('body', bundle[`baby-${breed}-body-1`], { width: body.size.width, height: body.size.height }, { x: body.position.x, y: body.position.y });
    // createCenteredSprite('head', bundle[`baby-${breed}-head-${head.value}`], { width: head.size.width, height: head.size.height }, { x: head.position.x, y: head.position.y });
    // createCenteredSprite('ears', bundle[`baby-${breed}-ears-${ears.value}`], { width: ears.size.width, height: ears.size.height }, { x: 270 + ears.size.width / 2 - middleX, y: 167 + ears.size.height / 2 - middleY });
    // createCenteredSprite('brows', bundle[`baby-${breed}-brows-${brows.value}`], { width: brows.size.width, height: brows.size.height }, { x: 329 + brows.size.width / 2 - middleX, y: 240 + brows.size.height / 2 - middleY });
    // createCenteredSprite('tail', bundle[`baby-${breed}-tail-${tail.value}`], { width: tail.size.width, height:tail.size.height });
    // createCenteredSprite('whiskers', bundle[`baby-${breed}-whiskers-${whiskers.value}`], { width: whiskers.size.width, height:whiskers.size.height }, { x: 225 + whiskers.size.width / 2 - middleX, y: 188 + whiskers.size.height / 2 - middleY });

    patterns.forEach((pattern) => {
      createCenteredSprite(`pattern-${pattern.id}`, bundle[`${pattern.part}-pattern-${pattern.value}-mask`], { width: pattern.size.width, height: pattern.size.height }, { x: pattern.position.x, y: pattern.position.y });
      const patternSprite = spritesMap[`pattern-${pattern.id}`];

      const container = new Container();
      container.zIndex = -1;
      container.pivot.set(pattern.size.width / 2, pattern.size.height / 2);
      container.x = pattern.position.x;
      container.y = pattern.position.y;

      const color = new Graphics();
      color.rect(0, 0, patternSprite.width, patternSprite.height).fill(pattern.color);

      container.addChild(patternSprite);
      container.addChild(color);

      color.mask = patternSprite;
      
      spritesMap[`${pattern.part}`].addChild(container);
    });

    // const tailPatternMask = createCenteredSprite(bundle['tail-pattern-1-mask'], { width: 101, height: 116 }, { x: 21, y: -27 });
    
    // const tailContainer = new Container();
    // tailContainer.x = 489 + tail.size.width / 2 - middleX;
    // tailContainer.y = 294 + tail.size.height / 2 - middleY;

    // const tailColor = new Graphics();
    // tailColor.rect(21, -27, 101, 116).fill(0xff000);
    // tailColor.pivot.set(50.5, 58);


    // tailContainer.addChild(tailPatternMask);
    // tailContainer.addChild(tailColor);
    // tailContainer.addChild(tailSprite);
    // tailColor.mask = tailPatternMask;

    for(const key in spritesMap) {
      petContainer.addChild(spritesMap[key]);
    }

    // for(const key in patternsMap) {
    //   petContainer.addChild(patternsMap[key]);
    // }


    // petContainer.addChild(spritesMap.body);
    // petContainer.addChild(headSprite);
    // petContainer.addChild(earsSprite);
    // petContainer.addChild(browsSprite);
    // petContainer.addChild(tailContainer);
    // petContainer.addChild(whiskersSprite);

  }, [petProps, petContainer]);

  const removePet = useCallback(() => {
    petContainer.removeChildren();
    petContainer.mask = null;
  }, [petContainer]);

  return { drawPet, removePet, petContainer, petProps };
};




