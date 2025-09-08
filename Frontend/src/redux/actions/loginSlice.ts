import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ErrorsData } from "../../interfaces/ErrorsData";

interface LoginData {
  email: string;
  password: string;
}

interface LoginState extends LoginData {
  status: "succeeded" | "failed" | "pending";
  errorMessage: string;
}

interface LoginResp {
  accessToken: string;
}

const initialState: LoginState = {
  email: "",
  password: "",
  status: "pending",
  errorMessage: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    resetForm: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loginFetch.pending, state => {
        state.status = "pending";
      })
      .addCase(loginFetch.fulfilled, state => {
        state.status = "succeeded";
      })
      .addCase(loginFetch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const loginFetch = createAsyncThunk("login/signin", async (formData: LoginData, { rejectWithValue }) => {
  console.log(formData);
  try {
    const resp = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!resp.ok) {
      const errorData: ErrorsData = await resp.json();
      console.log(errorData);
      return rejectWithValue("Credenziali errate!");
    }

    const data: LoginResp = await resp.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Errore durante il login. Riprovare più tardi.");
  }
});

export const { setEmail, setPassword, setErrorMessage, resetForm } = loginSlice.actions;

export default loginSlice.reducer;
