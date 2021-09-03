import React from 'react';

import BookCarousel from './BookCarousel';
import BookList from './BookList';
import CreateBookModal from './CreateBookModal';
import UpdateBookModal from './UpdateBookModal';
import Button from 'react-bootstrap/Button';

import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      selectedBook: null,
    };
  }

  postBook = async (newBook) => {
    this.props.auth0
      .getIdTokenClaims()
      .then(async (res) => {
        const jwt = res.__raw;

        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          data: {
            email: this.props.auth0.user.email,
            title: newBook.title,
            description: newBook.description,
            status: newBook.status,
          },
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: '/books',
          method: 'post',
        };

        const response = await axios(config);
        this.setState({ books: [...this.state.books, response.data] });
      })
      .catch((err) => console.error(err));
  };

  deleteBook = async (id) => {
    this.props.auth0
      .getIdTokenClaims()
      .then(async (res) => {
        const jwt = res.__raw;
        const books = this.state.books.filter((book) => book._id !== id);
        this.setState({ books });

        const config = {
          params: { email: this.props.auth0.user.email },
          headers: { Authorization: `Bearer ${jwt}` },
          method: 'delete',
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: `/books/${id}`,
        };

        axios(config);
      })
      .catch((err) => console.error(err));
  };

  updateBook = async (updatedBook) => {
    console.log(updatedBook);
    this.props.auth0.getIdTokenClaims().then(async (res) => {
      const jwt = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        data: {
          email: this.props.auth0.user.email,
          title: updatedBook.title,
          description: updatedBook.description,
          status: updatedBook.status,
        },
        method: 'put',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/books/${updatedBook._id}`,
      };

      const response = await axios(config);
      const books = this.state.books.filter((book) => book._id !== updatedBook._id);
      this.setState({ books: [...books, response.data] });
    });
    // try {
    //   const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/books/${updatedBook._id}`, bookObject);
    //   const books = this.state.books.filter((book) => book._id !== bookObject._id);
    //   this.setState({ books: [...books, response.data] });
    // } catch (err) {
    //   console.error(err);
    // }
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
    this.props.auth0
      .getIdTokenClaims()
      .then(async (res) => {
        const jwt = res.__raw;

        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: '/books',
          params: { email: this.props.auth0.user.email },
          method: 'get',
        };
        const booksResponse = await axios(config);
        this.setState({ books: booksResponse.data });
        console.log(booksResponse);
      })
      .catch((err) => console.error(err));
    // try {
    //   const books = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/${this.props.user.email}`);
    //   this.setState({
    //     books: books.data,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
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
          <h3>No Books Found</h3>
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

export default withAuth0(BestBooks);
