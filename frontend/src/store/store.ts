import { configureStore } from "@reduxjs/toolkit"
import alertMessageReducer from "../slicers/alertMessageSlice"
import loggedUserReducer from "../slicers/loggedUserSlice"
import messsagesReducer from "../slicers/messagesSlice"
import loaderReducer from "../slicers/loaderSlice"
import gropsReducer from "../slicers/groupsSlice"
import chatsReducer from "../slicers/chatsSlice"
import chatReducer from "../slicers/chatSlice"

export const store = configureStore({
  reducer: {
    alertMessage: alertMessageReducer,
    loader: loaderReducer,
    loggedUser: loggedUserReducer,
    groups: gropsReducer,
    chats: chatsReducer,
    chat: chatReducer,
    messages: messsagesReducer
  }
})
