// @flow

import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import ConnectedRouter from 'react-router-redux/ConnectedRouter.js';
import { history, setupStore, apolloClient } from '../store.js';
import Login from '../profile/views/Profile.js';
import App from '../App.js';
import { ApolloProvider } from 'react-apollo';
import { push } from 'react-router-redux';
import { MockedProvider } from 'react-apollo/test-utils';
import { UserProfileQuery } from '../profile/components/UserProfile';
import { PublicationsQuery } from '../feed/components/PublicationList';
import { UserMock, PublicationMock } from '../__mocks__/data';
import { addTypenameToDocument } from 'apollo-client';

// Definition of MockedProvider https://github.com/apollographql/react-apollo/blob/7308d200681debf1948efda95570f57dc3cb3a69/src/test-utils.tsx
// Example of mockNetworkInterface https://github.com/L1fescape/react-apollo/blob/8383115a2e4924402e3e802f82642b82a39abf87/test/react-web/client/graphql/queries/index.test.tsx

const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

const queryMocks = [
  {
    request: {
      query: addTypenameToDocument(UserProfileQuery),
      variables: {}
    },
    result: {
      data: {
        current_user: UserMock
      }
    }
  },
  {
    request: {
      query: addTypenameToDocument(PublicationsQuery),
      variables: {}
    },
    result: {
      data: {
        publications: {
          edges: {
            node: PublicationMock,
            __typename: 'PublicationEdge'
          },
          __typename: 'PublicationConnection'
        }
      }
    }
  }
];

const setupTests = () => {
  const store = setupStore(jest.fn());
  const wrapper = mount(
    <MockedProvider mocks={queryMocks} store={store}>
      <MemoryRouter initialEntries={['/profile']} initialIndex={1}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );

  store.dispatch({
    type: 'LOGIN_SUCCESS',
    payload: {
      token: 'test-token'
    }
  });

  return {
    store,
    wrapper
  };
};

// IDEA https://github.com/apollographql/react-apollo/blob/abf4347acfc155d7d9b8f2746d9007a4cc1d8e9f/test/react-web/server/index.test.tsx#L292-L329

describe('Profile feature', () => {
  test('User should be able to go to the Feed through a link', () => {
    const { wrapper, store } = setupTests();

    const btn = wrapper.find("a[href='/profile']");

    btn.simulate('click', { button: 0 });

    const link = wrapper.find("a[href='/']");

    link.simulate('click', { button: 0 });

    expect(wrapper.find('#feed')).toBeDefined();
  });

  test('Profile view should render User details', done => {
    const { wrapper, store } = setupTests();

    const btn = wrapper.find("a[href='/profile']");

    btn.simulate('click', { button: 0 });

    // await flushAllPromises();
    setTimeout(() => {
      const tag = wrapper.find('.profile-username');
      expect(tag.text()).toEqual('Foo Bar');
      done();
    }, 10);
  });
});
