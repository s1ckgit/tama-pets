import { addHistory } from "../pet-constructor-history-slice";
import { changeVision } from "../pet-constructor-slice";

const historyMiddleware = (store) => (next) => (action) => {
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
