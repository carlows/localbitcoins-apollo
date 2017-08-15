// @flow

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

type DefaultProps = void;
type Props = {
  current_user: Object,
  loading: Boolean
};
type State = void;

/**
 * UserProfileContainer component
 */
class UserProfileContainer extends React.Component<DefaultProps, Props, State> {
  render() {
    const userProps = this.props.current_user;
    return <UserProfile {...userProps} />;
  }
}

type UserProfileProps = {
  first_name: string,
  last_name: string,
  email: string,
  account_balance_BTC: number,
  account_balance_USD: number
};

class UserProfile extends React.PureComponent<
  DefaultProps,
  UserProfileProps,
  State
> {
  render() {
    const {
      first_name,
      last_name,
      email,
      account_balance_USD,
      account_balance_BTC
    } = this.props;

    return (
      <div>
        <h2>
          {first_name} {last_name}
        </h2>
        <p>
          {email}
        </p>
        <p>
          Balance USD: ${account_balance_USD}
        </p>
        <p>
          Balance BTC: {account_balance_BTC}
        </p>
      </div>
    );
  }
}

const UserProfileQuery = gql`
  query userProfile {
    current_user {
      id
      first_name
      last_name
      email
      account_balance_BTC
      account_balance_USD
    }
  }
`;

/**
 * The props object is like the mapStateToProps function
 *
 */
export default graphql(UserProfileQuery, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: ({ data: { loading, current_user } }) => ({
    current_user,
    loading
  })
})(UserProfileContainer);
