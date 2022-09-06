import { configureStore } from "@reduxjs/toolkit"
import alertMessageReducer from "../slicers/alertMessageSlice"
import loaderReducer from "../slicers/loaderSlice"

export const store = configureStore({
  reducer: {
    alertMessage: alertMessageReducer,
    loader: loaderReducer
  }
})
