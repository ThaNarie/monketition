import classNames from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMockLeague } from '../../mocks/Leage.mocks';
import './nav.scss';

import { me } from '../../data/me';

const leagues = Array.from({ length: 3 }, () => getMockLeague());

export function Nav(): JSX.Element {
  const [isScrolling, setIsScrolling] = useState(false);
  const updateScrolling = useCallback(() => {
    const scrollPosition = document.querySelector('#root')?.scrollTop ?? 0;
    if (scrollPosition > 0) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  }, []);
  useEffect(() => {
    document.querySelector('#root')?.addEventListener('scroll', updateScrolling);
    // updateScrolling();
    return () => {
      document.querySelector('#root')?.removeEventListener('scroll', updateScrolling);
    };
  }, [updateScrolling]);
  return (
    <nav
      className={classNames('navbar sticky-top navbar-expand-lg bg-body-tertiary', {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'is-scrolling': isScrolling,
      })}
    >
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
                Leagues
              </a>
              <ul className="dropdown-menu">
                <li key="heading">
                  <h6 className="dropdown-header">Your leagues</h6>
                </li>
                {leagues.map((league) => (
                  <li key={league.id}>
                    <Link className="dropdown-item" to={`/leagues/${league.slug}`}>
                      {league.name}
                    </Link>
                  </li>
                ))}
                <li key="divider">
                  <hr className="dropdown-divider" />
                </li>
                <li key="overview">
                  <Link className="dropdown-item" to="/leagues">
                    League Overview
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
                {me.name}
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-item-text">
                  {me.streak > 0 ? 'Hot' : 'Cold'} streak{' '}
                  <span className={`badge text-bg-${me.streak > 0 ? 'danger' : 'primary'}`}>
                    {Math.abs(me.streak)}
                  </span>
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
