import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileResponse, UserData, UserState } from "../../interfaces/User";
import type { ErrorsData } from "../../interfaces/ErrorsData";

const initialState: UserState<UserData> = {
  data: {
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    password: "",
  },
  status: "pending",
  errorMessage: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.data.name = action.payload;
    },
    setSurname: (state, action: PayloadAction<string>) => {
      state.data.surname = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.data.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.data.password = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.data.phoneNumber = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(profileFetch.pending, state => {
        state.status = "pending";
      })
      .addCase(profileFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(profileFetch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const profileFetch = createAsyncThunk("profile/me", async (_, { rejectWithValue }) => {
  try {
    const resp = await fetch("http://localhost:3001/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!resp.ok) {
      const errorData: ErrorsData = await resp.json();
      return rejectWithValue(errorData.message);
    }

    const data: ProfileResponse = await resp.json();
    console.log(data);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Qualcosa è andato storto.");
  }
});

export const { setName, setSurname, setEmail, setPassword, setPhoneNumber, setErrorMessage } = profileSlice.actions;

export default profileSlice.reducer;
