import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import Router from "router/Router"

import { worker } from "api/server"

// Start our mock API server
worker.start({ onUnhandledRequest: "bypass" })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
