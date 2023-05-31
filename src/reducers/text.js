import { createSlice } from "@reduxjs/toolkit";
import { text } from "../assets/data";

const initialState = text;
let randomText = (a) => a[Math.floor(Math.random() * a.length)];

export const textReducer = createSlice({
    name: "text",
    initialState: randomText(initialState),
    reducers: {
        textSelector: (state) => {
            return randomText(initialState);
        }
    }
});

export const { textSelector } = textReducer.actions;
export default textReducer.reducer;
