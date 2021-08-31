import { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselItem from './carouselItem';

export default class BookCarousel extends Component {
  render() {
    console.log(this.props.books);
    return (
      <Carousel>
        <>{this.props.books && this.props.books.map((book) => <CarouselItem book={book} key={book._id} />)}</>
      </Carousel>
    );
  }
}
