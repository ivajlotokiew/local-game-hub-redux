import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api-client";

const gameSlice = createSlice({
  name: "gameList",
  initialState: {
    games: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.games = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getGames.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const getGames = createAsyncThunk("gameList/getGames", async () => {
  try {
    const response = await apiClient.get("/games");
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
});

// Selectors
export const selectGames = (state) => state.gameList.games;
export const selectLoadingState = (state) => state.gameList.isLoading;
export const selectErrorState = (state) => state.gameList.hasError;

export default gameSlice.reducer;
