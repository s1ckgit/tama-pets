import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ChangeBodyPayload, ChangePatternsPayload, ChangeVisionPayload, PetConstructorState } from "@/lib/types";
import { BabyCatBrowsEnum, BabyCatHeadEnum } from "@/lib/assets-info";

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
    value: 1,
    size: {
      width: 252,
      height: 329
    },
    position: {
      x: 0,
      y: 0
    }
  },
  brows: BabyCatBrowsEnum[0],
  ears: {
    value: 1,
    size: {
      width: 160,
      height: 93
    },
    position: {
      x: -51,
      y: -87
    }
  },
  head: BabyCatHeadEnum[0],
  tail: {
    value: 1,
    size: {
      width: 145,
      height: 173
    },
    position: {
      x: 161,
      y: 80
    }
  },
  whiskers: {
    value: 1,
    size: {
      width: 272,
      height: 104
    },
    position: {
      x: -40,
      y: -60
    },
  },
  patterns: [
    {
      part: 'tail',
      value: 1,
      size: {
        width: 100,
        height: 116
      },
      position: {
        x: 21.5, 
        y: -27
      },
      id: 1,
      color: '#000000'
    }
  ]
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
          part: action.payload.part
        };
    },
    changePatterns(state, action: PayloadAction<ChangePatternsPayload>) {
      if(action.payload.delete) {
        state.patterns = state.patterns.filter((item) => item.id !== action.payload.pattern.id);
      } 
      else {
        state.patterns.push(action.payload.pattern);
      } 
    }
  }
});

export default petConstructorSlice.reducer;

export const { changeBreed, changeVision } = petConstructorSlice.actions;
