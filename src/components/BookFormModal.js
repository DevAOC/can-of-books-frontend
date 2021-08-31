import { Component } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';

export default class BookFormModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.modal();

    const newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: this.props.user.email,
      status: e.target.read.checked,
    }
    this.props.handleSubmit(newBook);
  };

  render() {
    return (
      <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" centered>
        {this.props.user ? (
          <>
            <Modal.Header closeButton onClick={this.props.modal}>
              <Modal.Title id="contained-modal-title-vcenter">Post a Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <FloatingLabel controlId="floatingInput" label="Title">
                  <Form.Control type="text" placeholder="Enter title of book" name="title" required />
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
          </>
        ) : (
          <>
            <Modal.Header closeButton onClick={this.props.modal}>
              <Modal.Title id="contained-modal-title-vcenter">Please log in to post a book</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
          </>
        )}
      </Modal>
    );
  }
}
