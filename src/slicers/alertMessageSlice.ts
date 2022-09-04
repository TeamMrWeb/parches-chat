import { createSlice } from "@reduxjs/toolkit"

interface alertMessage {
  title: string
  description: string
  type: string //success, warning, info, error
  visible: boolean
}

const initialState: alertMessage = {
  title: "",
  description: "",
  type: "",
  visible: false
}

export const alertMessageSlice = createSlice({
  name: "alertMessage",
  initialState,
  reducers: {
    createAlertMessage: (state, action) => {
      Object.assign(state, { ...action.payload })
    },
    closeAlertMessage: state => {
      state.visible = false
    }
  }
})

export const { createAlertMessage, closeAlertMessage } = alertMessageSlice.actions

export default alertMessageSlice.reducer
