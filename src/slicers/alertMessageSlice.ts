import { createSlice } from "@reduxjs/toolkit"
import { AlertMessageProps } from "../ts/interfaces"

const initialState: AlertMessageProps = {
  title: "",
  description: "",
  type: "",
  visible: false,
  lifeTime: 10000
}

export const alertMessageSlice = createSlice({
  name: "alertMessage",
  initialState,
  reducers: {
    createAlertMessage: (state, action) => {
      Object.assign(state, { ...action.payload })
    },
    closeAlertMessage: state => {
      state.title = ""
      state.description = ""
      state.visible = false
    }
  }
})

export const { createAlertMessage, closeAlertMessage } = alertMessageSlice.actions

export default alertMessageSlice.reducer
