import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import BestBooks from './components/BestBooks';
import Profile from './components/Profile';
import Footer from './components/Footer';
import { withAuth0 } from '@auth0/auth0-react';
import { Container, Card } from 'react-bootstrap';

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
              {this.props.auth0.isAuthenticated && (
                <>
                  <Route exact path="/">
                    <Card className="mb-3 homeCard">
                      <Card.Body>
                        <Card.Title className="m-1"><h1 className="h1">Welcome to Can Of Books</h1></Card.Title>
                        <Card.Text className="m-1"><h2>Books are life-changing. They have the power to enlighten, educate, entertain, heal, and help us grow. This app is used to track what books have impacted the user in an organized matter.</h2></Card.Text>
                      </Card.Body>
                    </Card>
                  </Route>
                  <Route exact path="/books">
                    <BestBooks user={this.state.user} />
                  </Route>
                  <Route exact path="/profile">
                    <Profile id="profile" profile={this.state.user} />
                  </Route>
                </>
              )}
              <Route exact path="/">
                <Card className="mb-3 homeCard" style={{ Width: '65%' }}>
                  <Card.Body>
                    <Card.Title className="m-1"><h1 className="h1">Welcome to Can Of Books</h1></Card.Title>
                    <Card.Text className="m-1"><h2>Books are life-changing. They have the power to enlighten, educate, entertain, heal, and help us grow. This app is used to track what books have impacted the user in an organized matter.</h2></Card.Text>
                  </Card.Body>
                </Card>
              </Route>
            </Switch>
          </Container>
          <Footer />
        </Router>
        <div className="footerSpacer"></div>
      </>
    );
  }
}

export default withAuth0(App);
