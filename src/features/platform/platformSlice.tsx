import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api-client";
import { ServerError } from "../../common/types";
import { platformState } from "../../common/types";

type RootState = {
  platformList: platformState;
};

const platformSlice = createSlice({
  name: "platformList",
  initialState: {
    platforms: [],
    isLoading: false,
    error: {} as ServerError,
  } as platformState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlatforms.pending, (state) => {
        state.isLoading = true;
        state.error = {} as ServerError;
      })
      .addCase(getPlatforms.fulfilled, (state, { payload }) => {
        state.platforms = payload.results;
        state.isLoading = false;
        state.error = {} as ServerError;
      })
      .addCase(getPlatforms.rejected, (state, { payload }) => {
        const msg = payload.message;
        const status = payload.response.status;
        state.error = { statusCode: Number(status), description: msg };
        state.isLoading = false;
      });
  },
});

export const getPlatforms = createAsyncThunk(
  "platformList/getPlatforms",
  async (endpoint: string, { rejectWithValue }) => {
    debugger;
    try {
      const response = await apiClient.get(`${endpoint}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Selectors
export const selectPlatforms = (state: RootState) =>
  state.platformList.platforms;
export const selectLoadingState = (state: RootState) =>
  state.platformList.isLoading;
export const selectErrorState = (state: RootState) => state.platformList.error;

export default platformSlice.reducer;
