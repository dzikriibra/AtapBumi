import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCurrentUser, loginUser, registerUser } from "./authApi";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,

  loginStatus: "idle",
  registerStatus: "idle",
  sessionStatus: "idle",

  error: null,
};

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUser(userData);

    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials);
    const token = response.data.data.token;

    localStorage.setItem("token", token);

    return token;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const restoreSession = createAsyncThunk("auth/restoreSession", async (_, { rejectWithValue }) => {
  try {
    const response = await getCurrentUser();

    return response.data.data.user;
  } catch (error) {
    localStorage.removeItem("token");

    return rejectWithValue(error.response?.data?.message || "Session expired");
  }
});

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");

      state.token = null;
      state.user = null;
      state.error = null;
      state.loginStatus = "idle";
      state.registerStatus = "idle";
      state.sessionStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerStatus = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.registerStatus = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      })

      .addCase(restoreSession.pending, (state) => {
        state.sessionStatus = "loading";
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.sessionStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.sessionStatus = "failed";
        state.token = null;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
