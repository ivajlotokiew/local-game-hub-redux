import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./features/game/gameSlice";
import genreReducer from "./features/genre/genreSlice";

const store = configureStore({
  reducer: {
    gameList: gameReducer,
    genreList: genreReducer,
  },
});

export default store;
