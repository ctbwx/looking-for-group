import React from 'react';
import * as Auth from './../../client/models/auth.js'; 

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  onSubmit (e) {
    //Axios request for signing up
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    console.log(username, password);

    Auth.userSignup(username, password);

    document.getElementById("signup").reset();
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
        <form className="signup-form" id="signup" onSubmit={this.onSubmit.bind(this)}>
          <label>Username: </label>
          <input onChange={this.onChange.bind(this)} type="text" name="username" />
          <label>Password: </label>
          <input onChange={this.onChange.bind(this)} type="password" name="password" />
          <input type='submit'  value='Sign Up!'/>
        </form>
      );
    };
}

export default SignUp
