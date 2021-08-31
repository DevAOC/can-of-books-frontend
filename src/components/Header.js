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
        <NavItem>
          <Link to="/books" className="nav-link">
            View Books
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
      </Navbar>
    );
  }
}

export default Header;
