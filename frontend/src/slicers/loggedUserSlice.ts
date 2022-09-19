import { createSlice } from "@reduxjs/toolkit"

interface loggedUser {
  username?: string
  avatar?: string
  verified?: boolean
  password?: string
  email?: string
  status?: number
  friends?: any
  pendingFriends?: any
  blockedUsers?: any
}

const initialState: loggedUser = {}

export const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    setLoggedUserField: (state, action) => {
      const firstFieldUnknown = action.payload[Object.keys(action.payload)[0]]
      const field = Object.keys(firstFieldUnknown)[1] as string
      const value = Object.values(firstFieldUnknown)[1]
      state[field as keyof typeof state] = value
    }
  }
})

export const { setLoggedUserField } = loggedUserSlice.actions

export default loggedUserSlice.reducer
