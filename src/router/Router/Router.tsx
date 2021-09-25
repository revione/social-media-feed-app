import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Navbar from "components/Navbar"
import PostsList from "components/PostsList"

const App = () => (
  <Router>
    <Navbar />
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <PostsList />} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

export default App
