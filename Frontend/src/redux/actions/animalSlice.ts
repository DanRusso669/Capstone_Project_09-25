import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AllAnimalResponse, Animal, AnimalState } from "../../interfaces/Animal";
import type { ErrorsData } from "../../interfaces/ErrorsData";

const initialState: AnimalState = {
  data: { list: [], single: null },
  requestStatus: "pending",
  errorMessage: "",
  filters: {
    page: 0,
    size: 10,
    sortBy: "id",
    gender: "",
    status: "",
    species: "",
    breed: "",
    province: "",
  },
};

const animalSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.filters.size = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.filters.sortBy = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.filters.gender = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setSpecies: (state, action: PayloadAction<string>) => {
      state.filters.species = action.payload;
    },
    setBreed: (state, action: PayloadAction<string>) => {
      state.filters.breed = action.payload;
    },
    setProvince: (state, action: PayloadAction<string>) => {
      state.filters.province = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(allAnimalFetch.pending, state => {
        state.requestStatus = "pending";
      })
      .addCase(allAnimalFetch.fulfilled, (state, action) => {
        state.requestStatus = "succeeded";
        if (state.filters.page === 0) {
          state.data.list = action.payload;
        } else {
          state.data.list = [...state.data.list, ...action.payload];
        }
        state.data.list = action.payload;
      })
      .addCase(allAnimalFetch.rejected, (state, action) => {
        state.requestStatus = "failed";
        state.errorMessage = action.payload as string;
      })

      .addCase(singleAnimalFetch.pending, state => {
        state.requestStatus = "pending";
      })
      .addCase(singleAnimalFetch.fulfilled, (state, action) => {
        state.requestStatus = "succeeded";
        state.data.single = action.payload;
      })
      .addCase(singleAnimalFetch.rejected, (state, action) => {
        state.requestStatus = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const allAnimalFetch = createAsyncThunk("animals/get-all", async (filterParams: string, { rejectWithValue }) => {
  try {
    const resp = await fetch(`http://localhost:3001/animals?${filterParams}`, {
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

export const { setPage, setSize, setSortBy, setGender, setStatus, setSpecies, setBreed, setProvince } = animalSlice.actions;

export default animalSlice.reducer;
