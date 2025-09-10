import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AllAnimalResponse, AnimalState } from "../../interfaces/Animal";
import type { ErrorsData } from "../../interfaces/ErrorsData";

const initialState: AnimalState = {
  data: [],
  status: "pending",
  errorMessage: "",
};

const animalSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(allAnimalFetch.pending, state => {
        state.status = "pending";
      })
      .addCase(allAnimalFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(allAnimalFetch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const allAnimalFetch = createAsyncThunk("animals/get-all", async (_, { rejectWithValue }) => {
  try {
    const resp = await fetch("http://localhost:3001/animals", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!resp.ok) {
      const errorData: ErrorsData = await resp.json();
      return rejectWithValue(errorData.message);
    }

    const data: AllAnimalResponse = await resp.json();
    return data.content;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Qualcosa è andato storto.");
  }
});

export default animalSlice.reducer;
