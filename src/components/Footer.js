import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar className="footer" collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="bottom">
        <Navbar.Brand className="m-3">Created by: Team Supreme</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
