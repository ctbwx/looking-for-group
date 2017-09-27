import React from 'react';
import * as Auth from './../../client/models/auth.js';

class LogIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      notFound: false,
      loggedIn: false,
      alreadyLoggedIn: false
    }
    this.userLogin = Auth.userLogin
  }

  onSubmit (e) {
    //Axios request for logging in
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;

    //Fire function with that makes axios post from Auth.  Bind this to the funtion.  See auth for next step.
    this.userLogin.call(this, username, password)

    document.getElementById("login").reset();
  }

  onChange (e) {
    //Update form as user inputs text
    e.preventDefault();
    var key = e.target.name
    var value = e.target.value
    this.setState({ [key]: value })
  }

  render() {
    return (
        <div>
          <form className="login-form" id="login" onSubmit={this.onSubmit.bind(this)}>
            <label>Username: </label>
            <input onChange={this.onChange.bind(this)} type="text" name="username" />
            <label>Password: </label>
            <input onChange={this.onChange.bind(this)} type="password" name="password" />
            <input type='submit'  value="Log In"/>
          </form>
            {this.state.loggedIn ? <p>Log In Successful!</p> : null}
            {this.state.notFound ? <p>USERNAME OR PASSWORD NOT FOUND</p> : null}
            {this.state.alreadyLoggedIn ? <p>USER ALREADY LOGGED IN</p> : null}
        </div>
      );
    };
}

export default LogIn
