import React from 'react';

import BookCarousel from './bookCarousel';

import axios from 'axios';

export default class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    try {
      const books = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`);
      this.setState({
        books: books.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    /* TODO: render user's books in a Carousel */

    return <>{this.state.books.length ? <BookCarousel books={this.state.books} /> : <h3>No Books Found :(</h3>}</>;
  }
}
