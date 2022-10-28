import { createSlice } from "@reduxjs/toolkit"
import { loaderProps } from "../ts/interfaces"

const initialState: loaderProps = {
  status: false,
  progress: 0
}

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoader: state => {
      state.progress = 0
      state.status = true
    },
    incrementProgressLoader: (state, action) => {
      state.progress = action.payload
    },
    completeProgressLoader: state => {
      state.progress = 100
    },
    stopLoader: state => {
      state.status = false
    }
  }
})

export const { startLoader, stopLoader, incrementProgressLoader, completeProgressLoader } =
  loaderSlice.actions

export default loaderSlice.reducer
