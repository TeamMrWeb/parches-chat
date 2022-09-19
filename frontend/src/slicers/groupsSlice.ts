import { createSlice } from "@reduxjs/toolkit"

const initialState: string[] = []

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      const chats = action.payload.chats
      state.push(...chats)
    }
  }
})

export const { setGroups } = groupsSlice.actions

export default groupsSlice.reducer
