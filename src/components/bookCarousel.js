import { Component } from 'react';
import { Carousel } from 'react-bootstrap';

export default class BookCarousel extends Component {
  render() {
    return (
      <Carousel>
        {this.props.books &&
          this.props.books.map((book) => {
            return (
              <Carousel.Item key={book._id}>
                <img className="d-block w-100" alt="placeholder" src="https://via.placeholder.com/200x100" />
                <Carousel.Caption>
                  <h2>{book.title}</h2>
                  <p>{book.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    );
  }
}
