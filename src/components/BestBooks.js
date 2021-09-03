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

  getPhoto = async (book) => {
    let photo;
    let result = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_KEY}&query=${book.title}`
    );
    if (result.data.results[0] === undefined) {
      photo =
        'https://images.unsplash.com/photo-1521714161819-15534968fc5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80';
    } else {
      photo = result.data.results[0].urls.raw;
    }
    return photo;
  };

  postBook = async (newBook) => {
    const photo = await this.getPhoto(newBook);
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
            photo: photo,
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
    const photo = await this.getPhoto(updatedBook);
    this.props.auth0.getIdTokenClaims().then(async (res) => {
      const jwt = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        data: {
          email: this.props.auth0.user.email,
          title: updatedBook.title,
          description: updatedBook.description,
          status: updatedBook.status,
          photo: photo,
        },
        method: 'put',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/books/${updatedBook._id}`,
      };

      const response = await axios(config);
      const books = this.state.books.filter((book) => book._id !== updatedBook._id);
      this.setState({ books: [...books, response.data] });
    });
  };

  handleUpdateModal = (id) => {
    const selectedBook = this.state.books.find((book) => book._id === id);
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
      })
      .catch((err) => console.error(err));
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
