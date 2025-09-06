import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ErrorsData } from "../../interfaces/ErrorsData";
interface RegisterData {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface RegisterState extends RegisterData {
  status: "succeeded" | "failed" | "pending";
  errorMessage: string;
}

interface RegisterResp {
  id: number;
}

const initialState: RegisterState = {
  name: "",
  surname: "",
  email: "",
  password: "",
  phoneNumber: "",
  status: "pending",
  errorMessage: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
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

export const registerFetch = createAsyncThunk("register/registration", async (formData: RegisterData, { rejectWithValue }) => {
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
