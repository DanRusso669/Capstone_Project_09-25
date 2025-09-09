import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ErrorsData } from "../../interfaces/ErrorsData";
import type { UserData, UserState } from "../../interfaces/User";
interface RegisterResp {
  id: number;
}

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

const registerSlice = createSlice({
  name: "register",
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
    resetForm: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(registerFetch.pending, state => {
        state.status = "pending";
      })
      .addCase(registerFetch.fulfilled, state => {
        state.status = "succeeded";
      })
      .addCase(registerFetch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const registerFetch = createAsyncThunk("register/registration", async (formData: UserData, { rejectWithValue }) => {
  try {
    const resp = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!resp.ok) {
      const errorData: ErrorsData = await resp.json();
      return rejectWithValue(errorData.message);
    }
    const data: RegisterResp = await resp.json();
    console.log("Utente salvato con ID " + data.id);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Errore durante la registrazione.");
  }
});

export const { setName, setSurname, setEmail, setPassword, setPhoneNumber, setErrorMessage, resetForm } = registerSlice.actions;

export default registerSlice.reducer;
