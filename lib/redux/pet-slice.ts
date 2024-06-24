import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchPet } from "@/actions/pets";

import { type PetWithIndex } from "@/lib/types";

export const fetchPetState = createAsyncThunk('pet/fetchPet', async (userId: string) => {
  const pet = await fetchPet(userId);
  return pet;
});

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    pet: null
  } as { pet: PetWithIndex },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPetState.fulfilled, (state, action: PayloadAction<PetWithIndex>) => {
      state.pet = action.payload;
    });
  },
});

export default petSlice.reducer;
