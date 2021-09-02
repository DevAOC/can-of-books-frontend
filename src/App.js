import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import BestBooks from './components/BestBooks';
import Profile from './components/Profile';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showModal: false,
    };
  }

  loginHandler = (user) => {
    this.setState({
      user: { name: user.target.username.value, email: user.target.email.value },
    });
  };

  logoutHandler = () => {
    this.setState({
      user: null,
    });
  };

  // showLoginModal = () => {
  //   this.setState({
  //     showModal: this.state.showModal ? false : true,
  //   });
  // };

  render() {
    return (
      <>
        <Router>
          {/* <Header user={this.state.user} onLogout={this.logoutHandler} modal={this.showLoginModal} /> */}
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          {/* <LoginModal onLogin={this.loginHandler} modal={this.showLoginModal} show={this.state.showModal} /> */}
          <Switch>
            {this.props.auth0.isAuthenticated ? (
              <>
                <Route exact path="/books">
                  <BestBooks user={this.state.user} />
                </Route>
                <Route exact path="/profile">
                  <Profile profile={this.state.user} />
                </Route>
              </>
            ) : (
              <Route exact path="/"></Route>
            )}
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
