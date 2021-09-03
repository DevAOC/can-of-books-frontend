import { Component } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class UpdateBookModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const book = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.read.checked,
      email: this.props.auth0.user.email,
      _id: this.props.selected._id,
    };
    this.props.update(book);
    this.props.closeModal();
  };

  render() {
    if (this.props.selected) {
      return (
        <Modal show={this.props.selected} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton onClick={this.props.closeModal}>
            <Modal.Title id="contained-modal-title-vcenter">Update This Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <FloatingLabel controlId="floatingInput" label="Update Title">
                <Form.Control type="text" defaultValue={this.props.selected.title} name="title" required />
              </FloatingLabel>
              <FloatingLabel className="mb-3" controlId="floatingInput" label="Update Description">
                <Form.Control
                  type="text"
                  defaultValue={this.props.selected.description}
                  placeholder="Enter a description for this book"
                  name="description"
                  required
                />
              </FloatingLabel>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  name="read"
                  defaultChecked={this.props.selected.read}
                  type="checkbox"
                  label="Book has been read"
                />
              </Form.Group>
              <Button type="submit">Update</Button>
            </Form>
          </Modal.Body>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

export default withAuth0(UpdateBookModal);
