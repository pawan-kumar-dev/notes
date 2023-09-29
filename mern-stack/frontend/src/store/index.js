import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/workoutSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
