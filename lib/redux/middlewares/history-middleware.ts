import { type ChangeVisionPayload } from "@/lib/types";
import { addHistory } from "../pet-constructor-history-slice";
import { changeVision } from "../pet-constructor-slice";
import { type Action, type MiddlewareAPI } from "@reduxjs/toolkit";

const historyMiddleware = (store: MiddlewareAPI) => (next: (args: Action) => void) => (action: { type: string; payload: ChangeVisionPayload; }) => {
  if (action.type === changeVision.type) {
    const previousPart = store.getState().petConstructor[action.payload.part];
    if(previousPart.id === action.payload.id) {
      console.log('ne nada');
      return;
    }
    store.dispatch(addHistory(previousPart));
  }
  return next(action);  
};

export default historyMiddleware;
