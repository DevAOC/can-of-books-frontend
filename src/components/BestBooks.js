import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import BookCarousel from './bookCarousel';

import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    try {
      const books = await axios.get(`${REACT_APP_BACKEND_URL}/books`);
      this.setState({
        books: books,
      });
    } catch (err) {
      console.log(err.response);
    }
  }

  render() {
    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? <BookCarousel books={this.state.books} /> : <h3>No Books Found :(</h3>}
      </>
    );
  }
}

export default BestBooks;
