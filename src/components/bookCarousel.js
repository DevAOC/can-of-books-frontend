import { Carousel } from 'bootstrap';
import { Component } from 'react';
import CarouselItem from './carouselItem';

export default class BookCarousel extends Component {
  render() {
    return <Carousel>{this.props.books && this.props.books.map((book) => <CarouselItem book={book} />)}</Carousel>;
  }
}
