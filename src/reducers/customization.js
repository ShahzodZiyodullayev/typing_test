import { createSlice } from "@reduxjs/toolkit";

const whichMode = localStorage.getItem("mode")
  ? JSON.parse(localStorage.getItem("mode"))
  : true;

const otherStyles = {
  // sidesPadding: 3,
};

const initialState = (bool = whichMode) => {
  localStorage.setItem("mode", bool);
  switch (bool) {
    case true:
      return {
        mode: "light",
        bool,
        styles: {
          primaryTextColor: "#010A19",
          background: "#fff",
        },
      };
    case false:
      return {
        mode: "dark",
        bool,
        styles: {
          primaryTextColor: "#fff",
          background: "#010A19",
        },
      };
  }
};

export const customizationReducer = createSlice({
  name: "customization",
  initialState: { ...initialState(), ...otherStyles },
  reducers: {
    themeMode: (state, { _, payload }) => {
      state = { ...initialState(payload), ...otherStyles };
      return state;
    },
    otherStylesMode: (state, { _, payload }) => {
      state = { ...state, ...payload };
      return state;
    },
  },
});

export const { themeMode, otherStylesMode } = customizationReducer.actions;
export default customizationReducer.reducer;
