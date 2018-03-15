import { combineReducers } from "redux"

import user from "./users"
import chatroom from "./chatrooms"
import map from "./map"

export default combineReducers({
  user,
  chatroom,
  map
})
