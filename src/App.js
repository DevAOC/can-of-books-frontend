import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import BestBooks from './components/BestBooks';
import Profile from './components/Profile';
import Footer from './components/Footer';
import LoginModal from './components/loginModal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showModal: false,
    };
  }

  loginHandler = (user) => {
    this.setState({
      user: { name: 'Antoine', email: 'bih@email.com' },
    });
  };

  logoutHandler = () => {
    this.setState({
      user: null,
    });
  };

  showLoginModal = () => {
    this.setState({
      showModal: this.state.showModal ? false : true,
    });
  };

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} modal={this.showLoginModal} />
          <LoginModal onLogin={this.loginHandler} modal={this.showLoginModal} show={this.state.showModal} />
          <Switch>
            <Route exact path="/books">
              <BestBooks />
            </Route>
            {this.state.user ? (
              <>
                <Route exact path="/profile">
                  <Profile profile={this.state.user} />
                </Route>
              </>
            ) : (
              <Route exact path="/"></Route>
            )}
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}
