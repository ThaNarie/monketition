import { NavLink, Link } from 'react-router-dom';

export function Nav(): JSX.Element {
  return (
    <nav className="navbar sticky-top  navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ladder.monks
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Leages
              </a>
              <ul className="dropdown-menu">
                <li>
                  <h6 className="dropdown-header">Your leages</h6>
                </li>
                <li>
                  <Link className="dropdown-item" to="/leages/foo-bar">
                    Foo Bar
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/leages">
                    Leages Overview
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <button className="btn btn-outline-success me-3" type="submit">
            Submit score
          </button>
          {/* <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="rounded-circle shadow-4-strong me-2"
                  alt="avatar2"
                  src="https://i.pravatar.cc/32"
                />
                John Doe
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item-text">
                  Hot streak <span className="badge text-bg-danger">4</span>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile/me">
                    Your profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Log out
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
