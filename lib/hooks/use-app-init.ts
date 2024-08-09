import * as Pixi from 'pixi.js';
import { type RefObject, useEffect, useMemo, useState } from 'react';


export const useAppInit = ({ manifest, canvasRef }: { manifest: Pixi.AssetsManifest, canvasRef: RefObject<HTMLDivElement> }) => {
  const [appIsStarted, setAppIsStarted] = useState<boolean>(false);

  const app = useMemo(() => {
    const app = new Pixi.Application();
    return app;
  }, []);

  useEffect(() => {
    const initApp = async () => {
      try {
        await app.init({ backgroundColor: 0x996666, width: 480, height: 640 });
        await Pixi.Assets.init({ manifest });
        Pixi.Assets.backgroundLoadBundle('baby-cat');

        canvasRef.current?.appendChild(app.canvas);
        setAppIsStarted(true);
      } catch(e) {
        console.error(e);
      }
    };
    initApp();

    return () => {
      if (app) {
        app.destroy({ removeView: true }, { children: true });
      }
    };

  }, [app, manifest, canvasRef]);

  

  return { app, appIsStarted };
};
