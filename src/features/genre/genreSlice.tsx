import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api-client";
import { ServerError } from "../../common/types";
import { genreState } from "../../common/types";
import { RootState } from "../../common/types";

const genreSlice = createSlice({
    name: "genreList",
    initialState: {
        genres: [],
        isLoading: false,
        error: {} as ServerError,
    } as genreState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.isLoading = true;
                state.error = {} as ServerError;
            })
            .addCase(getGenres.fulfilled, (state, { payload }) => {
                state.genres = payload.results;
                state.isLoading = false;
                state.error = {} as ServerError;
            })
            .addCase(getGenres.rejected, (state, { payload }) => {
                const msg = payload.message
                const status = payload.response.status
                state.error = { statusCode: Number(status), description: msg };
                state.isLoading = false;
            });
    },
});

export const getGenres = createAsyncThunk('genreList/getGenres', async (endpoint: string, { rejectWithValue }) => {
    debugger
    try {
        const response = await apiClient.get(`${endpoint}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Selectors
export const selectGenres = (state: RootState) => state.genreList.genres;
export const selectLoadingState = (state: RootState) => state.genreList.isLoading;
export const selectErrorState = (state: RootState) => state.genreList.error;

export default genreSlice.reducer;
