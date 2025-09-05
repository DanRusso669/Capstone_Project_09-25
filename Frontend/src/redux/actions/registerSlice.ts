import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  status: "succeeded" | "failed" | "pending";
}

const initialState: RegisterState = {
  name: "",
  surname: "",
  email: "",
  password: "",
  status: "pending",
  phoneNumber: "",
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
  },
  extraReducers: builder => {
    builder
      .addCase(registerFetch.pending, state => {
        state.status = "pending";
      })
      .addCase(registerFetch.fulfilled, state => {
        state.status = "succeeded";
      })
      .addCase(registerFetch.rejected, state => {
        state.status = "failed";
      });
  },
});

export const registerFetch = createAsyncThunk("register/registration", async (formData: RegisterState) => {
  try {
    const resp = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (resp.ok) {
      const newUserId: number = await resp.json();
      console.log("Utente salvato con ID " + newUserId);
      return newUserId;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
  }
});

export const { setName, setSurname, setEmail, setPassword, setPhoneNumber } = registerSlice.actions;

export default registerSlice.reducer;
