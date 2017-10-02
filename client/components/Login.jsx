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
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;

    //Axios request for logging in
    //Fires function from Auth that logs user in.  Bind this to the funtion.  See auth for next step.
    this.userLogin.call(this, username, password)
    //Resets the form field to empty values.
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
      <div className="container">
        <div className="row">
          <div className="center-block">
            <form className="login-form form-inline" id="login" onSubmit={this.onSubmit.bind(this)}>
              <label>Username: </label>
              <input onChange={this.onChange.bind(this)} type="text" name="username" />
              <label>Password: </label>
              <input onChange={this.onChange.bind(this)} type="password" name="password" />
              <input type='submit'  value="Log In"/>
              {this.state.loggedIn ? <p>Log In Successful!</p> : null}
              {this.state.notFound ? <p>Username Or Password Not Found</p> : null}
              {this.state.alreadyLoggedIn ? <p>User Already Logged In</p> : null}
            </form>
            </div>
          </div>
        </div>
      );
    };
}

export default LogIn
