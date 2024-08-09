import * as Pixi from 'pixi.js';

export default async function initApp({ manifest }: { manifest: Pixi.AssetsManifest }) {
  const app = new Pixi.Application();

  try {
    await app.init({ backgroundColor: 0x996666, width: 480, height: 640 });
    await Pixi.Assets.init({ manifest });
    Pixi.Assets.backgroundLoadBundle('baby-cat');

  } catch(e) {
    console.error(e);
  }

  return app;
}
