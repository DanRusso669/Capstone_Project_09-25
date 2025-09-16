import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DefinitiveUserState, NewPasswordData, PasswordCheckRequest, PasswordCheckResponse, ProfileResponse, UserData } from "../../interfaces/User";
import type { ErrorsData } from "../../interfaces/ErrorsData";

const initialState: DefinitiveUserState = {
  data: {
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    password: "",
  },
  newPasswordData: {
    newPassword: "",
    newPasswordRepeated: "",
    oldPassword: "",
  },
  status: "pending",
  errorMessage: "",
  passwordCheckResult: null,
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
    setPasswordCheckResult: (state, action: PayloadAction<boolean>) => {
      state.passwordCheckResult = action.payload;
    },
    setNewPassword: (state, action: PayloadAction<string>) => {
      state.newPasswordData.newPassword = action.payload;
    },
    setNewPasswordRepeated: (state, action: PayloadAction<string>) => {
      state.newPasswordData.newPasswordRepeated = action.payload;
    },
    setOldPassword: (state, action: PayloadAction<string>) => {
      state.newPasswordData.oldPassword = action.payload;
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
      })

      .addCase(passwordCheck.pending, state => {
        state.status = "pending";
      })
      .addCase(passwordCheck.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.passwordCheckResult = action.payload;
      })
      .addCase(passwordCheck.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload as string;
      })

      .addCase(updateProfileFetch.pending, state => {
        state.status = "pending";
      })
      .addCase(updateProfileFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateProfileFetch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload as string;
      })
      // CHANGE PASSWORD
      .addCase(changePasswordFetch.pending, state => {
        state.status = "pending";
      })
      .addCase(changePasswordFetch.fulfilled, state => {
        state.status = "succeeded";
      })
      .addCase(changePasswordFetch.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const profileFetch = createAsyncThunk("profile/me", async (_, { rejectWithValue }) => {
  try {
    const resp = await fetch("http://localhost:3001/users/me", {
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
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("userRoles", JSON.stringify(data.roles.map(role => role.roleDef)));
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Qualcosa è andato storto.");
  }
});

export const passwordCheck = createAsyncThunk("profile/password-check", async (dataInfo: PasswordCheckRequest, { rejectWithValue }) => {
  try {
    const resp = await fetch("http://localhost:3001/users/me/password-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(dataInfo),
    });

    if (resp.ok) {
      const data: PasswordCheckResponse = await resp.json();
      return data.result;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("Qualcosa è andato storto.");
  }
});

export const updateProfileFetch = createAsyncThunk("profile/update-profile", async (updatedData: UserData, { rejectWithValue }) => {
  try {
    const resp = await fetch("http://localhost:3001/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!resp.ok) {
      const errorData: ErrorsData = await resp.json();
      return rejectWithValue(errorData.message);
    }

    const data: ProfileResponse = await resp.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const changePasswordFetch = createAsyncThunk("profile/change-password", async (newPasswordData: NewPasswordData, { rejectWithValue }) => {
  try {
    const resp = await fetch("http://localhost:3001/users/me/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(newPasswordData),
    });

    if (!resp.ok) {
      const errorData: ErrorsData = await resp.json();
      return rejectWithValue(errorData.message);
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const {
  setName,
  setSurname,
  setEmail,
  setPassword,
  setPhoneNumber,
  setErrorMessage,
  setPasswordCheckResult,
  setNewPassword,
  setNewPasswordRepeated,
  setOldPassword,
} = profileSlice.actions;

export default profileSlice.reducer;
