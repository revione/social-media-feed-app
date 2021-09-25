// libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
// components
import Navbar from "components/Navbar"
import PostsList from "components/PostsList"
import AddPost from "components/AddPost"

const App = () => (
  <Router>
    <Navbar />
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <AddPost />
              <PostsList />
            </>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

export default App
