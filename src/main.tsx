import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import Router from "router/Router"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
