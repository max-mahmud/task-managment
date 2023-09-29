import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./boardSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    boards: boardSlice,
    theme: themeSlice,
  },
});

export default store;
