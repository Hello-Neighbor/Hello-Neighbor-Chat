import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Chatroom from "./components/chat/main"
import MapInterface from "./components/map/main"

import store from "./store"
import "../style/reset.scss"
import "../style/transition.scss"
import "../style/main.scss"

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
	<MapInterface />
</Provider>, app);
