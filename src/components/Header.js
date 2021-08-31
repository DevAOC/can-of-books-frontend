import React from 'react';
import { Navbar, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Header.css';

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
        {!this.props.user ? (
          <>
            <NavItem>
              <Button onClick={this.props.modal}>Log in</Button>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </NavItem>
            <NavItem>
              <Button onClick={this.props.onLogout}>Log out</Button>
            </NavItem>
          </>
        )}
        {/* TODO: if the user is logged in, render a navigation link to profile page */}
        {/* TODO: if the user is logged in, render the `LogoutButton` */}
      </Navbar>
    );
  }
}

export default Header;
