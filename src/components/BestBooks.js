import React from 'react';

import BookCarousel from './BookCarousel';
import BookList from './BookList';
import CreateBookModal from './CreateBookModal';
import UpdateBookModal from './UpdateBookModal';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export default class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      selectedBook: null,
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
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/books/${id}`);
      const books = this.state.books.filter((book) => book._id !== id);
      this.setState({ books });
    } catch (err) {
      console.error(err);
    }
  };

  updateBook = async (bookObject) => {
    console.log(bookObject);
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/books/${bookObject._id}`, bookObject);
      const books = this.state.books.filter((book) => book._id !== bookObject._id);
      this.setState({ books: [...books, response.data] });
    } catch (err) {
      console.error(err);
    }
  };

  handleUpdateModal = (id) => {
    const selectedBook = this.state.books.find((book) => book._id === id);
    console.log(selectedBook);
    this.setState({ selectedBook });
  };

  closeUpdateModal = () => this.setState({ selectedBook: null });

  componentDidMount() {
    this.fetchBooks();
  }

  showBookModal = () => {
    this.setState({
      showModal: this.state.showModal ? false : true,
    });
  };

  fetchBooks = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/books/${this.props.user.email}`;
    console.log(url);
    try {
      const books = await axios.get(url);
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
        {this.state.books.length && <BookCarousel books={this.state.books} />}
        <Button className="add-btn" onClick={this.showBookModal}>
          Add a book
        </Button>
        {this.state.books.length ? (
          <>
            <BookList books={this.state.books} delete={this.deleteBook} update={this.handleUpdateModal} />
          </>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <CreateBookModal
          user={this.props.user}
          handleSubmit={this.postBook}
          modal={this.showBookModal}
          show={this.state.showModal}
        />
        <UpdateBookModal
          user={this.props.user}
          closeModal={this.closeUpdateModal}
          selected={this.state.selectedBook}
          update={this.updateBook}
        />
      </>
    );
  }
}
