import { createSlice } from "@reduxjs/toolkit"

const initialState: string[] = []

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      const chats = action.payload.chats
      state.push(...chats)
    }
  }
})

export const { setChats } = chatsSlice.actions

export default chatsSlice.reducer
