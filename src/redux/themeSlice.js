import { createSlice } from "@reduxjs/toolkit";

// Read the theme preference from localStorage or default to 'light'
const initialTheme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: initialTheme === "dark",
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export const selectIsDarkMode = (state) => state.theme.isDarkMode;
export default themeSlice.reducer;
