import { configureStore } from "@reduxjs/toolkit";
import petReducer from './pet-slice';
import petConstructorReducer from './pet-constructor-slice';
import colorPickerReducer from './color-picker-slice';
import patternColorPickerReducer from './pattern-color-picker-slice';

export const store = configureStore({
  reducer: {
    petData: petReducer,
    petConstructor: petConstructorReducer,
    colorPicker: colorPickerReducer,
    patternColorPicker: patternColorPickerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
