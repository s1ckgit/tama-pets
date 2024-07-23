import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PartType } from "../types";

interface ColorPickerState {
  color: string;
  cancelColor: string | undefined;
  partToPaint: PartType | undefined;
}

const initialState = {
  color: '#ffffff',
  cancelColor: undefined,
  partToPaint: undefined
} as ColorPickerState;

const colorPickerSlice = createSlice({
  name: 'color-picker',
  initialState,
  reducers: {
    changeColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
    changeCancelColor(state, action: PayloadAction<string | undefined>) {
      state.cancelColor = action.payload;
    },
    changePartToPaint(state, action: PayloadAction<PartType | undefined>) {
      state.partToPaint = action.payload;
    }
  }
});

export default colorPickerSlice.reducer;

export const { changeColor, changeCancelColor, changePartToPaint } = colorPickerSlice.actions;
