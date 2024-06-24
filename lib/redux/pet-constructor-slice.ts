import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ChangePatternsPayload, ChangeVisionPayload, PetConstructorState } from "@/lib/types";
import { BabyCatHeadEnum } from "@/lib/assets-info";

export const getRandomBreed = () => {
  const breeds = ['cat', 'dog', 'sheep'];
  const index = Math.floor(Math.random() * breeds.length);
  return breeds[index];
};

export function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return +`0x${hex.padStart(6, '0')}`;
}



const petConstructorSlice = createSlice({
  name: 'pet-constructor',
  initialState: {
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
    brows: {
      value: 1,
      size : {
        width: 60,
        height: 21
      },
      position: {
        x: 0,
        y: 0
      }
    },
    ears: {
      value: 1,
      size: {
        width: 159,
        height: 92
      },
      position: {
        x: 0,
        y: 0
      }
    },
    head: BabyCatHeadEnum['1'],
    tail: {
      value: 1,
      size: {
        width: 144,
        height: 171
      },
      position: {
        x: 0,
        y: 0
      }
    },
    whiskers: {
      value: 1,
      size: {
        width: 271,
        height: 103
      },
      position: {
        x: 0,
        y: 0
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
  } as PetConstructorState,
  reducers: {
    changeBreed(state, action: PayloadAction<ChangeVisionPayload>) {
      state.body = action.payload;
    },
    changeVision(state, action: PayloadAction<ChangeVisionPayload>) {
      const part = action.payload.part;
        state[part] = {
          value: action.payload.value,
          size: action.payload.size,
          position: action.payload.position
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
