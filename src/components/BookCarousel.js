import { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

export default class BookCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = { photos: [] };
  }

  async componentDidMount() {
    for (let book of this.props.books) {
      let photo = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_KEY}&query=${book.title}`
      );
      if (photo.data.results[0] === undefined) {
        photo =
          'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80';
        this.setState({ photos: [...this.state.photos, photo] });
      } else {
        this.setState({ photos: [...this.state.photos, photo.data.results[0].urls.raw] });
      }
    }
  }

  render() {
    return (
      <div className="carousel-background">
        <Carousel className="mb-3">
          {this.props.books &&
            this.props.books.map((book, idx) => {
              return (
                <Carousel.Item key={book._id}>
                  <img className="carousel-img d-block w-100" alt="placeholder" src={this.state.photos[idx]} />
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
