import { configureStore } from "@reduxjs/toolkit";
import petReducer from './pet-slice';
import petConstructorReducer from './pet-constructor-slice';

export const store = configureStore({
  reducer: {
    petData: petReducer,
    petConstructor: petConstructorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
