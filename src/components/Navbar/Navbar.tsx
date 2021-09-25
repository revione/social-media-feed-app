// libraries
import { Link } from "react-router-dom"
// styles
import { Nav, NavContent } from "./styles"

const Navbar = () => (
  <Nav>
    <section>
      <h1>Redux Essentials Example</h1>

      <NavContent>
        <div className="navLinks">
          <Link to="/">Posts</Link>
        </div>
      </NavContent>
    </section>
  </Nav>
)

export default Navbar
