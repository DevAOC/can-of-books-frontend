import { Component } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

export default class LoginModal extends Component {
  userCheck = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  render() {
    return (
      <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton onClick={this.props.modal}>
          <Modal.Title id="contained-modal-title-vcenter">Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="text" placeholder="Text" />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.userCheck} type="submit">
            Log in
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
