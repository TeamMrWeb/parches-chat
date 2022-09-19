import { createSlice } from "@reduxjs/toolkit"

interface loader {
  status: boolean
  progress: number
}

const initialState: loader = {
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

export const { startLoader, stopLoader, incrementProgressLoader, completeProgressLoader } = loaderSlice.actions

export default loaderSlice.reducer
