import { configureStore } from "@reduxjs/toolkit";
import petReducer from './pet-slice';
import petConstructorReducer from './pet-constructor-slice';
import historyMiddleware from "./middlewares/history-middleware";
import historyReducer from './pet-constructor-history-slice';

export const store = configureStore({
  reducer: {
    petData: petReducer,
    petConstructor: petConstructorReducer,
    history: historyReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(historyMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
