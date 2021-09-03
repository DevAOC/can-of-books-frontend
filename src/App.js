import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import BestBooks from './components/BestBooks';
import Profile from './components/Profile';
import Footer from './components/Footer';
import { withAuth0 } from '@auth0/auth0-react';
import { Container } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <>
        <Router>
          <Header />
          <Container>
            <Switch>
              {this.props.auth0.isAuthenticated ? (
                <>
                  <Route exact path="/books">
                    <BestBooks user={this.state.user} />
                  </Route>
                  <Route exact path="/profile">
                    <Profile id="profile" profile={this.state.user} />
                  </Route>
                </>
              ) : (
                <Route exact path="/"></Route>
              )}
            </Switch>
          </Container>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
