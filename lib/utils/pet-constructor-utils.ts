import { Sprite, Container, Graphics, Texture } from "pixi.js";
import { PatternsPayload, type PetConstructorProp } from "../types";

export type SpritesMapType = { [key: string]: Container };

export type PatternMapType = { [key: string]: Sprite };

export interface CreateSpriteFunctionInterface {
  name: string;
  texture: Texture;
  size: {
    width: number,
    height: number
  };
  position: {
    x: number,
    y: number
  };
  color: string | null;
  spritesMap: SpritesMapType;
  patternMap: PatternMapType;
}

interface CreateSceneLayoutInterface {
  width: number;
  height: number;
  middleX: number;
  middleY: number;
  container: Container;
}

interface CreateSpriteForPetPropInterface {
  propKey: string, 
  prop: PetConstructorProp, 
  spritesMap: SpritesMapType, 
  patternMap: PatternMapType,
  color: string | null, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bundle: any,
  breed: string
}

interface CreatePatternSpriteInterface {
  spritesMap: SpritesMapType;
  patternMap: PatternMapType;
  pattern: PatternsPayload;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bundle: any
}


export const createCenteredSprite = ({ 
  name, 
  texture, 
  size = { width: 100, height: 100 }, 
  position = { x: 0, y: 0 },
  color,
  spritesMap,
  patternMap
}: CreateSpriteFunctionInterface) => {

  // Создаём спрайт из текстуры и применяем к нему размеры из аргументов, ставим якорь посередине
  const sprite = Sprite.from(texture); 
  sprite.width = size.width;
  sprite.height = size.height;

  if(name.endsWith('mask') || name.startsWith('pattern')) {
    // Если это паттерн или маска - контейнер не создаём, просто закидываем спрайт в patternMap

    patternMap[name] = sprite;
  } 
  else {
    // Создаём контейнер, позиционируем его и добавляем в него наш спрайт
    const container = new Container();

    container.x = position.x;
    container.y = position.y;
    container.pivot.set(size.width / 2, size.height / 2);

    container.addChild(sprite);

    if(color) {
      // Если у спрайта можно менять цвет, создаём контейнер с цветом и маской для этого спрайта, 
      // Добавляем контейнер с цветом в контейнер с основным спрайтом
      const colorGraphic = new Graphics();
      const colorContainer = new Container();
      colorContainer.zIndex = -1;
      const colorMask = patternMap[`${name}-mask`];
      colorGraphic.rect(0, 0, size.width, size.height).fill(color);
      colorContainer.addChild(colorMask);
      colorContainer.addChild(colorGraphic);
      colorGraphic.mask = colorMask;

      container.addChild(colorContainer);
    }
  
    spritesMap[name] = container;
  }
};

export const createSceneLayout = ({ width, height, middleX, middleY, container }: CreateSceneLayoutInterface) => {
  const containerBase = new Sprite();
  containerBase.setSize(width, height);
  container.x = middleX;
  container.y = middleY;
  container.pivot.set(middleX, middleY);
  container.addChild(containerBase);
};

export const createSpriteForPetProp = ({ propKey, prop, spritesMap, patternMap, color, bundle, breed }: CreateSpriteForPetPropInterface) => {
  if (color) {
    createCenteredSprite({ 
      name: `${propKey}-mask`,
      texture: bundle[`${breed}-${propKey}-${prop.value}-mask`],
      size: { width: prop.size.width, height: prop.size.height },
      position: { x: 0, y: 0 },
      color: null,
      spritesMap,
      patternMap
      });
  }
  createCenteredSprite({ 
    name: propKey, 
    texture: bundle[`${breed}-${propKey}-${prop.value}`], 
    size: { width: prop.size.width, height: prop.size.height }, 
    position: { x: prop.position.x, y: prop.position.y },
    color: color,
    spritesMap,
    patternMap
  });
};

export const createPatternSprite = ({ pattern, spritesMap, patternMap, bundle }: CreatePatternSpriteInterface) => {
  console.log(pattern, 'pattern', pattern.color, 'color');
  createCenteredSprite({
    name: `pattern-${pattern.id}`, 
    texture: bundle[`${pattern.part}-${pattern.partValue}-pattern-${pattern.value}-mask`], 
    size: { width: pattern.size.width, height: pattern.size.height }, 
    position: { x: pattern.position.x, y: pattern.position.y },
    color: null,
    spritesMap,
    patternMap
 });
 const patternSprite = patternMap[`pattern-${pattern.id}`];

 const container = new Container();
 container.zIndex = -1;
 container.pivot.set(pattern.size.width / 2, pattern.size.height / 2);
 container.x = pattern.position.x;
 container.y = pattern.position.y;

 const color = new Graphics();
 color.rect(0, 0, patternSprite.width, patternSprite.height).fill(pattern.color);

 container.addChild(patternSprite);
 container.addChild(color);

 console.log(container);

 color.mask = patternSprite;
 
 spritesMap[`${pattern.part}`].addChild(container);
};
