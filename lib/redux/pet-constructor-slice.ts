import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    color: getRandomHexColor(),
    breed: getRandomBreed()
  },
  reducers: {
    changeColor(state, action: PayloadAction<number>) {
      state.color = action.payload;
    },
    changeBreed(state, action: PayloadAction<string>) {
      state.breed = action.payload;
    }
  }
});

export default petConstructorSlice.reducer;

export const { changeColor, changeBreed } = petConstructorSlice.actions;
