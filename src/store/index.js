import { configureStore } from "@reduxjs/toolkit";
import customization from "../reducers/customization";
import isActive from "../reducers/timer";
import wpm from "../reducers/wpm";
import text from "../reducers/text";

export default configureStore({
    reducer: {
        customization,
        isActive,
        wpm,
        DATA: text
    },
    devTools: process.env.NODE_ENV !== "production"
});
