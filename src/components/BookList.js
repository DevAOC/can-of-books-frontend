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
                <Card key={book._id} style={{ minWidth: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.description}</Card.Text>
                    {book.status ? <Card.Text>Read</Card.Text> : <Card.Text>Unread</Card.Text>}
                    <Button variant="primary" onClick={(id) => this.props.update(book._id)}>
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
