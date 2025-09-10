import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AllAnimalResponse, Animal, AnimalState } from "../../interfaces/Animal";
import type { ErrorsData } from "../../interfaces/ErrorsData";

const initialState: AnimalState = {
  data: { list: [], single: null },
  status: "pending",
  errorMessage: "",
  page: 0,
  size: 10,
  sortBy: "id",
};

const animalSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(allAnimalFetch.pending, state => {
        state.status = "pending";
      })
      .addCase(allAnimalFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.list = [...state.data.list, ...action.payload];
      })
      .addCase(allAnimalFetch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload as string;
      })

      .addCase(singleAnimalFetch.pending, state => {
        state.status = "pending";
      })
      .addCase(singleAnimalFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.single = action.payload;
      })
      .addCase(singleAnimalFetch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const allAnimalFetch = createAsyncThunk("animals/get-all", async (_, { rejectWithValue, getState }) => {
  const { animals } = getState() as { animals: AnimalState };
  const { page, size, sortBy } = animals;

  try {
    const resp = await fetch(`http://localhost:3001/animals?page=${page}&size=${size}&sortBy=${sortBy}`, {
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

export const singleAnimalFetch = createAsyncThunk("animals/get-single", async (animalId: string, { rejectWithValue }) => {
  try {
    const resp = await fetch(`http://localhost:3001/animals/${animalId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!resp.ok) {
      const errorData: ErrorsData = await resp.json();
      return rejectWithValue(errorData);
    }

    const data: Animal = await resp.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Qualcosa è andato storto.");
  }
});

export const { setPage, setSize, setSortBy } = animalSlice.actions;

export default animalSlice.reducer;
