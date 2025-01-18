import { Link } from "react-router";
import "./Navbar.scss";

function Navbar() {
  return (
    <nav className="navbar-container">
      <ul className="navbar-wrapper">
        <li className="navbar-item">
          <Link className="navbar-item-link" to="/musik">
            musik
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-item-link" to="/">
            ✯ - § - ✯
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-item-link" to="/textz">
            textz
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
