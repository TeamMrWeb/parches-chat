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
      Object.assign(state, { ...action.payload.user })
    },
    logOut: state => initialState
  }
})

export const { setLoggedUserField, logOut } = loggedUserSlice.actions

export default loggedUserSlice.reducer
