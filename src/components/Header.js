import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Header.css';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </NavItem>
        {!this.props.auth0.isAuthenticated ? (
          <>
            <NavItem>
              {/* <Button onClick={this.props.modal}>Log in</Button> */}
              <LoginButton />
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link to="/books" className="nav-link">
                View Books
              </Link>
            </NavItem>
            <NavItem>
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
