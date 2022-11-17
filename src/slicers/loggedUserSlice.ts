import { createSlice } from "@reduxjs/toolkit"
import { LoggedUserProps } from "../ts/interfaces"

const initialState: LoggedUserProps = {}

export const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    setLoggedUserField: (state, action) => {
      Object.assign(state, { ...action.payload.user })
    },
    logOut: () => initialState
  }
})

export const { setLoggedUserField, logOut } = loggedUserSlice.actions

export default loggedUserSlice.reducer
