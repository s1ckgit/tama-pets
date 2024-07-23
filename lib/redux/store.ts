import { configureStore } from "@reduxjs/toolkit";
import petReducer from './pet-slice';
import petConstructorReducer from './pet-constructor-slice';
import historyMiddleware from "./middlewares/history-middleware";
import historyReducer from './pet-constructor-history-slice';
import colorPickerReducer from './color-picker-slice';
import patternColorPickerReducer from './pattern-color-picker-slice';

export const store = configureStore({
  reducer: {
    petData: petReducer,
    petConstructor: petConstructorReducer,
    history: historyReducer,
    colorPicker: colorPickerReducer,
    patternColorPicker: patternColorPickerReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(historyMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
