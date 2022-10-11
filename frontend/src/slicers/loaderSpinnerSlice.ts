import { createSlice } from "@reduxjs/toolkit"

interface loader {
  status: boolean
}

const initialState: loader = {
  status: false
}

export const loaderSpinnerSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoaderSpinner: state => {
      state.status = true
    },
    stopLoaderSpinner: state => {
      state.status = false
    }
  }
})

export const { startLoaderSpinner, stopLoaderSpinner } = loaderSpinnerSlice.actions

export default loaderSpinnerSlice.reducer
