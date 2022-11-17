import { createSlice } from "@reduxjs/toolkit"
import { LoaderSpinnerProps } from "../ts/interfaces"

const initialState: LoaderSpinnerProps = {
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
