import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <span className="brand-title">The Daily Times</span>
          <span className="brand-subtitle">NYT-inspired news reader</span>
        </div>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>

          <NavLink to="/section/world" className="nav-link">
            World
          </NavLink>

          <NavLink to="/section/business" className="nav-link">
            Business
          </NavLink>

          <NavLink to="/section/technology" className="nav-link">
            Technology
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;