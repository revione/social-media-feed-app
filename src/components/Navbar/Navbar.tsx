// libraries
import { Link } from "react-router-dom"
// styles
import { Nav, NavContent } from "./styles"

const Navbar = () => (
  <Nav>
    <section>
      <h1>Redux Essentials Example</h1>

      <NavContent>
        <Link to="/">Posts</Link>
        <Link to="/users">Users</Link>
        <Link to="/counter">Counter</Link>
      </NavContent>
    </section>
  </Nav>
)

export default Navbar
