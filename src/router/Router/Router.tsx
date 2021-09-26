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
import Counter from "pages/Counter"

const App = () => (
  <Router>
    <Navbar />
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/:postId" component={SinglePost} />
        <Route exact path="/editPost/:postId" component={EditPost} />
        <Route exact path="/counter" component={Counter} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

export default App
