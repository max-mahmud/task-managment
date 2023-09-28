import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./doardSlice";

const store = configureStore({
  reducer: {
    board: boardSlice,
  },
});

export default store;
