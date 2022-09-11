import { createSlice } from "@reduxjs/toolkit"

interface errorMessage {
  title: string
  description: string
  visible: boolean
}

const initialState: errorMessage = {
  title: "",
  description: "",
  visible: false
}

export const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    createError: (state, action) => {
      Object.assign(state, { ...action.payload })
    },
    closeError: state => {
      state.visible = false
    }
  }
})

export const { createError, closeError } = errorMessageSlice.actions

export default errorMessageSlice.reducer
