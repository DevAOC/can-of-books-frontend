import { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default class BookCarousel extends Component {
  render() {
    return (
      <Carousel.Item>
        <img />
        <Carousel.Caption>
          <h3>{this.props.book.title}</h3>
          <p>{this.props.book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  }
}
