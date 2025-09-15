import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AllAnimalResponse, Animal, AnimalState } from "../../interfaces/Animal";
import type { ErrorsData } from "../../interfaces/ErrorsData";

const initialState: AnimalState = {
  data: { list: [], single: null },
  requestStatus: "pending",
  errorMessage: "",
  filters: {
    page: 0,
    lastPage: false,
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
        const { animals, lastPage } = action.payload;
        if (state.filters.page === 0) {
          state.data.list = animals;
        } else {
          state.data.list = [...state.data.list, ...animals];
        }
        state.filters.lastPage = lastPage;
      })
      .addCase(allAnimalFetch.rejected, (state, action) => {
        state.requestStatus = "failed";
        state.errorMessage = action.payload as string;
      })

      .addCase(animalCRUDFetch.pending, state => {
        state.requestStatus = "pending";
      })
      .addCase(animalCRUDFetch.fulfilled, (state, action) => {
        state.requestStatus = "succeeded";
        state.data.single = action.payload;
      })
      .addCase(animalCRUDFetch.rejected, (state, action) => {
        state.requestStatus = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const allAnimalFetch = createAsyncThunk("animals/get-all", async (filterParams: string, { rejectWithValue, getState }) => {
  const { animals } = getState() as { animals: AnimalState };
  const { page } = animals.filters;

  try {
    const resp = await fetch(`http://localhost:3001/animals?page=${page}&${filterParams}`, {
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
    return { animals: data.content, lastPage: data.last };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Qualcosa è andato storto.");
  }
});

export const animalCRUDFetch = createAsyncThunk(
  "animals/get-single",
  async ({ animalId, method }: { animalId: string; method: string }, { rejectWithValue }) => {
    try {
      const resp = await fetch(`http://localhost:3001/animals/${animalId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!resp.ok) {
        const errorData: ErrorsData = await resp.json();
        return rejectWithValue(errorData);
      }

      if (resp.status === 204) {
        return null;
      }

      const data: Animal = await resp.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Qualcosa è andato storto.");
    }
  }
);

export const { setPage, setSize, setSortBy, setGender, setStatus, setSpecies, setBreed, setProvince } = animalSlice.actions;

export default animalSlice.reducer;
