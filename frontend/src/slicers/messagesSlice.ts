import { createSlice } from "@reduxjs/toolkit"

interface messages {
  id?: string
  text?: string
  image?: string
  author?: Object
  edited?: boolean
  seen?: Object
  createdAt?: Date
  updatedAt?: Date
  __typename?: string
}

const initialState: messages = [] as messages

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      Object.assign(state, { ...action.payload.chat.messages })
    },
    setSuscriptionMessage: (state, action) => {
      ;(state as messages[]).push(action.payload.messageAdded)
    },
    clearMessages: state => {
      ;(state as messages[]).length = 0
    }
  }
})

export const { setMessages, setSuscriptionMessage, clearMessages } = messagesSlice.actions

export default messagesSlice.reducer
