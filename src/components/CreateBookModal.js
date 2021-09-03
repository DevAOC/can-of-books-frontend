import { Component } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class CreateBookModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.modal();

    const newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: this.props.auth0.user.email,
      status: e.target.read.checked,
    };
    this.props.handleSubmit(newBook);
  };

  render() {
    return (
      <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton onClick={this.props.modal}>
          <Modal.Title id="contained-modal-title-vcenter">Post a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <FloatingLabel controlId="floatingInput" label="Title">
              <Form.Control className="mb-3" type="text" placeholder="Enter title of book" name="title" required />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="floatingInput" label="Description">
              <Form.Control type="text" placeholder="Enter a description for this book" name="description" required />
            </FloatingLabel>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check name="read" type="checkbox" label="Book has been read" />
            </Form.Group>
            <Button type="submit">Post Book</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withAuth0(CreateBookModal);
