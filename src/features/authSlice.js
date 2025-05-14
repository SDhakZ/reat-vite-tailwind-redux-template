// src/features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { tokenManager } from "../utils/tokenManager";
import { userManager } from "../utils/userManager";
import { login } from "../thunks/authThunk";

// Initial State
const user = userManager.loadUser();
const { token } = tokenManager.loadTokens();

const initialState = {
  isAuthenticated: !!token,
  token: token,
  user: user,
  usernameError: null,
  passwordError: null,
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ----------------- Dummy login (remove after api integration) ------------------- //
    login(state) {
      state.isAuthenticated = true;
    },
    // ----------------- Dummy login ------------------- //
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      userManager.removeUser();
      tokenManager.removeTokens();
    },
    clearUsernameError: (state) => {
      state.usernameError = null;
    },
    clearPasswordError: (state) => {
      state.passwordError = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    checkAuth(state) {
      const { token } = tokenManager.loadTokens();
      const user = userManager.loadUser();
      if (token && user) {
        state.isAuthenticated = true;
        state.user = user;
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
      state.usernameError = null;
      state.passwordError = null;
    };
    const handleRejected = (state, action, message) => {
      state.loading = false;
      state.error = action.payload?.error || message;
      state.usernameError = action.payload?.usernameError || null;
      state.passwordError = action.payload?.passwordError || null;
    };
    const handleAuthSuccess = (state, action) => {
      const { user, token } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      userManager.saveUser(user);
      tokenManager.saveTokens({ token });
      state.loading = false;
    };

    builder
      // Login
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        handleAuthSuccess(state, action);
      })
      .addCase(login.rejected, (state, action) => {
        handleRejected(state, action, "Login failed.");
      });
  },
});

export const {
  logout,
  test,
  setLoading,
  checkAuth,
  clearUsernameError,
  clearPasswordError,
} = authSlice.actions;
export default authSlice.reducer;
