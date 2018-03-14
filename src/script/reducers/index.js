import { combineReducers } from "redux"

import user from "./users"
import chatroom from "./chatrooms"

export default combineReducers({
  user,
  chatroom
})
