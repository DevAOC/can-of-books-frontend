import { Component } from 'react';
import { Carousel } from 'react-bootstrap';

export default class BookCarousel extends Component {
  render() {
    // console.log(this.props.books);
    return (
      <div className="carousel-background">
        <Carousel className="mb-3">
          {this.props.books &&
            this.props.books.map((book) => {
              return (
                <Carousel.Item key={book._id}>
                  <img className="carousel-img d-block w-100" alt="placeholder" src={book.photo} />
                  <Carousel.Caption>
                    <h3 className="carousel-title">{book.title}</h3>
                    <p className="carousel-description">{book.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
    );
  }
}
