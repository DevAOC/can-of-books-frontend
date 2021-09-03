import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  componentDidMount() {
    console.log(this.props.auth0.user);
  }
  render() {
    return (
      <Card border="dark" id="profile-card">
        <Card.Header style={{ fontSize: '2rem' }}>User Info</Card.Header>
        <Card.Img id="profile-img" variant="top" src={this.props.auth0.user.picture} alt="user" />
        <Card.Body>
          <Card.Title id="profile-body">{this.props.auth0.user.name}</Card.Title>
        </Card.Body>
        <Card.Footer className="text-muted">{this.props.auth0.user.email}</Card.Footer>
      </Card>
    );
  }
}

export default withAuth0(Profile);
