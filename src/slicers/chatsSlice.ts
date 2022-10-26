import { createSlice } from "@reduxjs/toolkit"
import { ChatProps } from "../ts/interfaces"

const initialState: ChatProps[] = []

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      const chats = action.payload.chats
      state.push(...chats)
    },
    clearChats: () => initialState
  }
})

export const { setChats, clearChats } = chatsSlice.actions

export default chatsSlice.reducer
