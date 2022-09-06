import { configureStore } from "@reduxjs/toolkit"
import alertMessageReducer from "../slicers/alertMessageSlice"

export const store = configureStore({
  reducer: {
    alertMessage: alertMessageReducer
  }
})
