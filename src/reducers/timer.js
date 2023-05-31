import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const isActiveReducer = createSlice({
    name: "timer",
    initialState: initialState,
    reducers: {
        setIsActiveTimer: (state, { _, payload }) => {
            state = payload;
            return state;
        }
    }
});

export const { setIsActiveTimer } = isActiveReducer.actions;
export default isActiveReducer.reducer;
