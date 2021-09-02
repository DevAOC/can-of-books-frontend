import { Component } from 'react';
import { Card, Container, Button, CardGroup } from 'react-bootstrap';

export default class BookList extends Component {
  render() {
    return (
      <>
        <Container>
          <CardGroup style={{ justifyContent: 'center' }}>
            {this.props.books.map((book) => {
              return (
                <Card className="mb-3" border="dark" key={book._id} style={{ minWidth: '18rem' }}>
                  <Card.Body>
                    <Card.Title className="m-1">{book.title}</Card.Title>
                    <Card.Text className="m-1">{book.description}</Card.Text>
                    {book.status ? <Card.Text className="m-1">Read</Card.Text> : <Card.Text>Unread</Card.Text>}
                    <Button className="m-1" variant="primary" onClick={(id) => this.props.update(book._id)}>
                      Update
                    </Button>
                    <Button variant="danger" onClick={(id) => this.props.delete(book._id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardGroup>
        </Container>
      </>
    );
  }
}
