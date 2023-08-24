import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./features/game/gameSlice";
import genreReducer from "./features/genre/genreSlice";
import platformReducer from "./features/platform/platformSlice";

const store = configureStore({
  reducer: {
    gameList: gameReducer,
    genreList: genreReducer,
    platformList: platformReducer,
  },
});

export default store;
