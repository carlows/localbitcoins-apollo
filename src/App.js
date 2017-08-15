// @flow

import React, { Component } from 'react';
import { Switch } from 'react-router';
import { PrivateRoute, GuestRoute } from './routes';
import Login from './session/views/Login.js';
import Feed from './feed/views/Feed.js';
import Profile from './profile/views/Profile.js';

class App extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={Feed} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <GuestRoute path="/login" component={Login} />
      </Switch>
    );
  }
}

export default App;
