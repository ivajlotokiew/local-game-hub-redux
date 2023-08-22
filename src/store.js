import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./features/games/gameSlice";

const store = configureStore({
  reducer: {
    gameList: gameReducer,
  },
});

export default store;
