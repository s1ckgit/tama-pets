import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchPet } from "@/actions/pets";

import type { PetState } from "@/lib/types";

export const fetchPetState = createAsyncThunk('pet/fetchPet', async () => {
  const pet = await fetchPet();
  return pet;
});

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    pet: null
  } as { pet: PetState | null},
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPetState.fulfilled, (state, action: PayloadAction<PetState | null>) => {
      state.pet = action.payload;
    });
  },
});

export default petSlice.reducer;
