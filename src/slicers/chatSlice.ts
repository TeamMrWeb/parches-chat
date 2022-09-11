import { createSlice } from "@reduxjs/toolkit"

interface chat {
  id?: string
  name?: string
  messages?: Array<object>
  isGroup?: boolean
  secure?: boolean
  private?: boolean
  maxUsers?: number
  ownerId?: any
  admins?: Array<object>
  users?: Array<object>
  createdAt?: Date
  updatedAt?: Date
}

const initialState: chat = {}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      console.log(action.payload)
      Object.assign(state, { ...action.payload.chat })
    }
  }
})

export const { setChat } = chatSlice.actions

export default chatSlice.reducer
