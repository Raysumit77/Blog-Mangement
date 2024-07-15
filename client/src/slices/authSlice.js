import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import UserServices from "../services/users";

const initialState = {
  user: {},
  isEmailVerified: false,
  loading: false,
  error: "",
};

export const myProfile = createAsyncThunk("auth/myprofile", async () => {
  const result = await UserServices.getMyProfile();
  return result.data.data;
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload) => {
    const result = await UserServices.changePassword(payload);
    return result.data.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myProfile.fulfilled, (state, action) => {
        console.log(action.payload);
        state.profile = action.payload;
      })
      .addCase(myProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(myProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const authReducer = authSlice.reducer;
