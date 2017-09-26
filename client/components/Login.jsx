import React from 'react';
import * as Auth from './../../client/models/auth.js';

class LogIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  onSubmit (e) {
    //Axios request for logging in
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    console.log(username, password);

    Auth.userLogin(username, password);

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
        <form className="login-form" id="login" onSubmit={this.onSubmit.bind(this)}>
          <label>Username: </label>
          <input onChange={this.onChange.bind(this)} type="text" name="username" />
          <label>Password: </label>
          <input onChange={this.onChange.bind(this)} type="password" name="password" />
          <input type='submit'  value="Log In"/>
        </form>
      );
    };
}

export default LogIn
