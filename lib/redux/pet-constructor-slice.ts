import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ChangeBodyPayload, ChangePartColorPayload, ChangePatternColorPayload, ChangePatternsPayload, ChangeVisionPayload, PetConstructorState } from "@/lib/types";
import { BabyCatBrowsEnum, BabyCatEarsEnum, BabyCatHeadEnum, BabyCatTailsEnum, BabyCatWhiskersEnum } from "@/lib/assets-info";

import { enableMapSet } from 'immer';

enableMapSet();

export const getRandomBreed = () => {
  const breeds = ['cat', 'dog', 'sheep'];
  const index = Math.floor(Math.random() * breeds.length);
  return breeds[index];
};

export function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return +`0x${hex.padStart(6, '0')}`;
}

const initialState = {
  body: {
    breed: 'cat',
    color: '#ffffff',
    part: 'body',
    name: 'тело-1',
    value: 1,
    size: {
      width: 252,
      height: 329
    },
    position: {
      x: 240,
      y: 320
    },
    id: 452426,
    patterns: new Map([])
  },
  brows: BabyCatBrowsEnum[0],
  ears: BabyCatEarsEnum[0],
  head: BabyCatHeadEnum[0],
  tail: BabyCatTailsEnum[0],
  whiskers: BabyCatWhiskersEnum[0],
} as PetConstructorState;



const petConstructorSlice = createSlice({
  name: 'pet-constructor',
  initialState,
  reducers: {
    changeBreed(state, action: PayloadAction<ChangeBodyPayload>) {
      state.body = action.payload;
    },
    changeVision(state, action: PayloadAction<ChangeVisionPayload>) {
      const part = action.payload.part;
        state[part] = {
          value: action.payload.value,
          size: action.payload.size,
          position: action.payload.position,
          id: action.payload.id,
          name: action.payload.name,
          part: action.payload.part,
          color: action.payload.color,
          patterns: new Map([])
        };
    },
    changePartColor(state, action: PayloadAction<ChangePartColorPayload>) {
      const part = action.payload.part;
      if(state[part].color) {
        state[part].color = action.payload.color;
      }
    },
    changePatterns(state, action: PayloadAction<ChangePatternsPayload>) {
      const pattern = action.payload.pattern;
      const part = pattern.part;
      const patterns = state[part].patterns;
      const toDelete = patterns.has(pattern.id);
      if(toDelete) {
        patterns.delete(pattern.id);
      }
      else {
        patterns.set(pattern.id, pattern);
      }
    },
    changePatternColor(state, action: PayloadAction<ChangePatternColorPayload>) {
      const { color, part, patternID: id } = action.payload;
      const pattern = state[part].patterns.get(id);
      if(pattern) {
        pattern.color = color;
      }
    }

  }
});

export default petConstructorSlice.reducer;

export const { changeBreed, changeVision, changePatternColor, changePartColor, changePatterns } = petConstructorSlice.actions;
