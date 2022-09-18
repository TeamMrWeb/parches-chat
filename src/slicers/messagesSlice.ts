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
}

const initialState: messages = [] as messages

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      Object.assign(state, { ...action.payload.chat.messages })
    }
  }
})

export const { setMessages } = messagesSlice.actions

export default messagesSlice.reducer
