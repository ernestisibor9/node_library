import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    loaderSlice: loaderSlice,
    userSlice: userSlice,
  },
});

export default store;
