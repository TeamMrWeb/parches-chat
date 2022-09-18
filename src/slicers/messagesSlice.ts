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
    setNewLoggedUserMessage: (state, action) => {
      ;(state as messages[]).push(action.payload.messageAdded)
    }
  }
})

export const { setMessages, setNewLoggedUserMessage } = messagesSlice.actions

export default messagesSlice.reducer
