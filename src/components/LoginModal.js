import { Component } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

export default class LoginModal extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.modal();
    this.props.onLogin(event);
  };

  render() {
    return (
      <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton onClick={this.props.modal}>
          <Modal.Title id="contained-modal-title-vcenter">Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <FloatingLabel  controlId="floatingInput" label="Username">
              <Form.Control className="mb-3" type="text" placeholder="Text" name="username" required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control className="mb-3" type="email" placeholder="name@example.com" name="email" required />
            </FloatingLabel>
            <Button type="submit">Log in</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
