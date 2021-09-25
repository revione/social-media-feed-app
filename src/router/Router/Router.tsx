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
import SinglePost from "components/SinglePost"

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
        <Route exact path="/posts/:postId" component={SinglePost} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

export default App
