import { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

export default class BookCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {photos: []};
  }

  async componentDidMount() {
    for(let book of this.props.books) {
      const photo = await axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_KEY}&query=${book.title}`);
      this.setState({photos: [...this.state.photos, photo.data.results[0].urls.raw]});
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
