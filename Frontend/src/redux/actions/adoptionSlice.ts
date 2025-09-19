import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Adoption, AdoptionResponse, AdoptionState, UpdateAdoptionBody } from "../../interfaces/Adoption";
import type { ErrorsData } from "../../interfaces/ErrorsData";

const initialState: AdoptionState = {
  data: { list: [], single: null },
  requestStatus: "pending",
  errorMessage: "",
  filters: {
    page: 0,
    size: 10,
    sortBy: "id",
    sortByDirection: "asc",
    lastPage: false,
    status: "",
  },
};

const adoptionSlice = createSlice({
  name: "adoptions",
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
    setSortByDirection: (state, action: PayloadAction<string>) => {
      state.filters.sortByDirection = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(allAdoptionFetch.pending, state => {
        state.requestStatus = "pending";
      })
      .addCase(allAdoptionFetch.fulfilled, (state, action) => {
        state.requestStatus = "succeeded";
        const { adoptions, lastPage } = action.payload;
        if (state.filters.page === 0) {
          state.data.list = adoptions;
        } else {
          state.data.list = [...state.data.list, ...adoptions];
        }
        state.filters.lastPage = lastPage;
      })
      .addCase(allAdoptionFetch.rejected, (state, action) => {
        state.requestStatus = "failed";
        state.errorMessage = action.payload as string;
      })

      .addCase(adoptionCRUDFetch.pending, state => {
        state.requestStatus = "pending";
      })
      .addCase(adoptionCRUDFetch.fulfilled, (state, action) => {
        state.requestStatus = "succeeded";
        state.data.single = action.payload;
      })
      .addCase(adoptionCRUDFetch.rejected, (state, action) => {
        state.requestStatus = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const allAdoptionFetch = createAsyncThunk("adoptions/get-all", async (filterParams: string, { rejectWithValue, getState }) => {
  const { adoptions } = getState() as { adoptions: AdoptionState };
  const { page } = adoptions.filters;

  try {
    const resp = await fetch(`http://localhost:3001/adoptions?page=${page}&${filterParams}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!resp.ok) {
      const errorData: ErrorsData = await resp.json();
      return rejectWithValue(errorData);
    }

    const data: AdoptionResponse = await resp.json();
    return { adoptions: data.content, lastPage: data.last };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const adoptionCRUDFetch = createAsyncThunk(
  "adoptions/CRUD",
  async (
    { adoptionId, method, adoptionData }: { adoptionId: string | undefined; method: string; adoptionData: UpdateAdoptionBody | null },
    { rejectWithValue }
  ) => {
    try {
      const endpoint = adoptionId ? `http://localhost:3001/adoptions/${adoptionId}` : `http://localhost:3001/adoptions`;
      const resp = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: method === "PUT" ? JSON.stringify(adoptionData) : null,
      });

      if (!resp.ok) {
        const errorData: ErrorsData = await resp.json();
        return rejectWithValue(errorData);
      }

      if (resp.status === 204) {
        return null;
      }

      const data: Adoption = await resp.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const { setPage, setSize, setSortBy, setSortByDirection } = adoptionSlice.actions;

export default adoptionSlice.reducer;
