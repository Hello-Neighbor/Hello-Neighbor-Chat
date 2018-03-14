import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Chatroom from "./components/Chatroom"
import MapInterface from "./components/MapInterface"

import store from "./store"
import "../style/reset.scss"
import "../style/chatroom.scss"
import "../style/map.scss"
import "../style/global.scss"
import "../style/transition.scss"
import "../style/main.scss"

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <MapInterface />
</Provider>, app);
