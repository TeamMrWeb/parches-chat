import { createSlice } from "@reduxjs/toolkit"
import { MessageProps } from "../ts/interfaces"

const initialState: MessageProps = [] as MessageProps

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      ;(state as MessageProps[]).push(...action.payload.chat.messages)
    },
    setSuscriptionMessage: (state, action) => {
      ;(state as MessageProps[]).unshift(action.payload.chatMessageAdded)
    },
    clearMessages: state => {
      ;(state as MessageProps[]).length = 0
    }
  }
})

export const { setMessages, setSuscriptionMessage, clearMessages } = messagesSlice.actions

export default messagesSlice.reducer
