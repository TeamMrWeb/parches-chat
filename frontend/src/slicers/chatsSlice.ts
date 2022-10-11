import { createSlice } from "@reduxjs/toolkit"

const initialState: string[] = []

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      const chats = action.payload.chats
      state.push(...chats)
    },
    clearChats: state => initialState
  }
})

export const { setChats, clearChats } = chatsSlice.actions

export default chatsSlice.reducer
