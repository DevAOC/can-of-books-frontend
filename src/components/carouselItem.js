import { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default class BookCarousel extends Component {
  componentDidMount() {
    console.log(this.props.book);
  }
  render() {
    return (
      <Carousel.Item>
        <img className="d-block w-100" alt="placeholder" src="https://via.placeholder.com/200x200" />
        <Carousel.Caption>
          <h3>{this.props.book.title}</h3>
          <p>{this.props.book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  }
}
