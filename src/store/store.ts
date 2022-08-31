import { configureStore } from "@reduxjs/toolkit"
import errorMessageReducer from "../slicers/errorMessageSlice"

export const store = configureStore({
  reducer: {
    errorMessage: errorMessageReducer
  }
})
