import React from 'react';
import {Link} from 'react-router-dom';
import * as auth from '~/src/auth/authCalls';
import {withRouter} from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount = () => {
    if (auth.loggedIn()) {
      let user = auth.getUser();
      user.then(response => {
        this.setState({loggedIn: true, user: response.data.username});
      });
    }
  };
  loggOut = e => {
    e.preventDefault();
    auth.logout();
    this.setState({loggedIn: false});
    this.props.history.push('/auth/login');
  };
  render = () => {
    return (
      <div>
        <Link to="/">Home</Link>
        <span> | </span>
        {auth.loggedIn() ? (
          <span>
            <Link to="/admin/categories">Categories</Link>
            <span> | </span>
            <Link to="/admin/posts">Posts</Link>
            <span> | </span>
            <a href="#" onClick={this.loggOut.bind(this)}>
              Logout
            </a>
            <span> | </span>
            {this.state.user && auth.loggedIn()
              ? 'welcome ' + this.state.user
              : ''}
          </span>
        ) : (
          <span>
            <Link to="/auth/login">Login</Link>
            <span> | </span>
            <Link to="/auth/Registration">Regiter</Link>
          </span>
        )}
      </div>
    );
  };
}

export default withRouter(NavBar);
