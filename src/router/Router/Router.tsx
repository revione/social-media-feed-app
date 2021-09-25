import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Navbar from "components/Navbar"

const App = () => (
  <Router>
    <Navbar />
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <section>
              <h2>Welcome to the Redux Essentials example app!</h2>
            </section>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

export default App
