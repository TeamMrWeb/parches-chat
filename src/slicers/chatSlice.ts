import { createSlice } from "@reduxjs/toolkit"
import { ChatProps } from "../ts/interfaces"

const initialState: ChatProps = {}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      Object.assign(state, { ...action.payload.chat })
    }
  }
})

export const { setChat } = chatSlice.actions

export default chatSlice.reducer
