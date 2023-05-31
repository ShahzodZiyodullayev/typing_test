import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const wpmReducer = createSlice({
    name: "wpm",
    initialState: initialState,
    reducers: {
        setWpm: (state, { _, payload }) => {
            state = payload;
            return state;
        }
    }
});

export const { setWpm } = wpmReducer.actions;
export default wpmReducer.reducer;
