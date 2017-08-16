// @flow

import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import ConnectedRouter from 'react-router-redux/ConnectedRouter.js';
import { history, setupStore, apolloClient } from '../store.js';
import Login from '../session/views/Login.js';
import App from '../App.js';
import { ApolloProvider } from 'react-apollo';
import fetch from 'isomorphic-fetch';

let app;
let store;

describe('Session feature', () => {
  beforeAll(() => {
    store = setupStore(jest.fn());
    app = mount(
      <ApolloProvider store={store} client={apolloClient}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </ApolloProvider>
    );
  });

  test('User should be able to login and go the feed view', () => {
    let findTargetView = () => app.find('#feed');

    expect(findTargetView().node).toBeUndefined();

    let loginButton = app.find('#login button');
    loginButton.simulate('click');

    expect(findTargetView().node).not.toBeUndefined();
  });
});
