import { createSlice } from "@reduxjs/toolkit"

interface userLogged {
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

const initialState: userLogged = {}

export const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    setUserLoggedField: (state, action) => {
      const firstFieldUnknown = action.payload[Object.keys(action.payload)[0]]
      const field = Object.keys(firstFieldUnknown)[1] as string
      const value = Object.values(firstFieldUnknown)[1]
      state[field as keyof typeof state] = value
    }
  }
})

export const { setUserLoggedField } = userLoggedSlice.actions

export default userLoggedSlice.reducer
