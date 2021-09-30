// libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
// components
import Navbar from "components/Navbar"
import Home from "pages/Home"
import SinglePost from "pages/SinglePost"
import EditPost from "pages/EditPost"
import UsersList from "pages/UsersList"
import User from "pages/User"
import NotificationsList from "pages/NotificationsList"

import Counter from "pages/Counter"

const App = () => (
  <Router>
    <Navbar />
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/:postId" component={SinglePost} />
        <Route exact path="/editPost/:postId" component={EditPost} />
        <Route exact path="/users" component={UsersList} />
        <Route exact path="/users/:userId" component={User} />
        <Route exact path="/counter" component={Counter} />
        <Route exact path="/notifications" component={NotificationsList} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

export default App
