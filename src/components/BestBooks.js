import React from 'react';

import BookCarousel from './BookCarousel';
import BookList from './BookList';
import BookFormModal from './BookFormModal';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export default class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
    };
  }

  postBook = async (newBook) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/books`, newBook);
      this.setState({ books: [...this.state.books, response.data] });
    } catch (err) {
      console.error(err);
    }
  };

  deleteBook = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/books?id=${id}`);
      const books = this.state.books.filter((book) => book._id !== id);
      this.setState({ books });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    this.fetchBooks();
  }

  showBookModal = () => {
    this.setState({
      showModal: this.state.showModal ? false : true,
    });
  };

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

    return (
      <>
        {this.state.books.length ? (
          <>
            <BookCarousel books={this.state.books} />
            <BookList books={this.state.books} delete={this.deleteBook} />
          </>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <Button onClick={this.showBookModal}>Add a book</Button>
        <BookFormModal
          user={this.props.user}
          handleSubmit={this.postBook}
          modal={this.showBookModal}
          show={this.state.showModal}
        />
      </>
    );
  }
}
