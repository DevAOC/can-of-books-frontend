import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

class Header extends React.Component {
  render() {
    return (
      <Navbar className="header" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="m-3"><h1 className="h1">Can Of Books</h1></Navbar.Brand>
        <NavItem className="navItem">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </NavItem>
        {!this.props.auth0.isAuthenticated ? (
          <>
            <NavItem>
              <LoginButton />
            </NavItem>
          </>
        ) : (
          <>
            <NavItem className="navItem">
              <Link to="/books" className="nav-link">
                View Books
              </Link>
            </NavItem>
            <NavItem className="navItem">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </NavItem>
            <NavItem>
              <LogoutButton />
            </NavItem>
          </>
        )}
      </Navbar>
    );
  }
}

export default withAuth0(Header);
