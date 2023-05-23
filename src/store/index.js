import { configureStore } from "@reduxjs/toolkit";
import customization from "../reducers/customization";

export default configureStore({
  reducer: {
    customization,
  },
  devTools: process.env.NODE_ENV !== "production",
});
