import { Component } from 'react';
import Card from 'react-bootstrap/Card';

class Profile extends Component {
  render() {
    /* TODO: render information about logged in user */
    /* STRETCH TODO: if no logged in user then redirect home */
    return (
      <Card>
        <Card.Header>User Info</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.profile.name}</Card.Title>
          <Card.Text>{this.props.profile.email}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Profile;
