import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PartType } from "../types";

interface ChangePatternToPaintInterface {
  part: PartType, 
  patternID: number
}

interface PatternColorPickerState {
  color: string;
  cancelColor: string | undefined;
  patternToPaint: ChangePatternToPaintInterface | undefined;
}

const initialState = {
  color: '#ffffff',
  cancelColor: undefined,
  patternToPaint: undefined
} as PatternColorPickerState;

const patternColorPickerSlice = createSlice({
  name: 'pattern-color-picker',
  initialState,
  reducers: {
    changeColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
    changeCancelColor(state, action: PayloadAction<string | undefined>) {
      state.cancelColor = action.payload;
    },
    changePatternToPaint(state, action: PayloadAction<ChangePatternToPaintInterface | undefined>) {
      state.patternToPaint = action.payload;
    }
  }
});

export default patternColorPickerSlice.reducer;

export const { changeColor, changeCancelColor, changePatternToPaint } = patternColorPickerSlice.actions;
