import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api-client";
import { Game } from "../../hooks/useGames";

interface ServerError {
  statusCode: number
  description: string
}

interface gameState {
  games: Game[],
  isLoading: boolean,
  error: ServerError,
  count: number,
}

type RootState = {
  gameList: gameState
}

const gameSlice = createSlice({
  name: "gameList",
  initialState: {
    games: [],
    isLoading: false,
    error: {} as ServerError,
    count: 0,
  } as gameState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.isLoading = true;
        state.error = {} as ServerError;
      })
      .addCase(getGames.fulfilled, (state, { payload }) => {
        state.games = payload.results;
        state.count = payload.count;
        state.isLoading = false;
        state.error = {} as ServerError;
      })
      .addCase(getGames.rejected, (state, { payload }) => {
        const msg = payload.message
        const status = payload.response.status
        state.error = { statusCode: Number(status), description: msg };
        state.isLoading = false;
      });
  },
});

export const getGames = createAsyncThunk('gameList/gatGames', async (endpoint: string, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// Selectors
export const selectGames = (state: RootState) => state.gameList.games;
export const selectLoadingState = (state: RootState) => state.gameList.isLoading;
export const selectErrorState = (state: RootState) => state.gameList.error;
export const selectGamesCount = (state: RootState) => state.gameList.count;

export default gameSlice.reducer;
