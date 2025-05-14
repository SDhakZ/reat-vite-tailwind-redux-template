import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ values }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login/administrator", {
        username: values.username,
        password: values.password,
      });
      const { token, user } = data;

      return { user, token };
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message;
      console.log(error.response?.data?.error?.message);
      if (error.response?.status === 401) {
        if (errorMessage === "Wrong Password.") {
          return rejectWithValue({
            passwordError: errorMessage,
          });
        } else {
          return rejectWithValue({
            usernameError: errorMessage,
          });
        }
      } else if (error.response?.status === 404) {
        return rejectWithValue({
          usernameError: "User not found. Please check your username.",
        });
      } else {
        return rejectWithValue({
          usernameError: "Login failed. Please try again later.",
        });
      }
    }
  }
);
