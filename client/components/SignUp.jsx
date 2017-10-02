import React from 'react';
import * as Auth from './../../client/models/auth.js';

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      signedUp: false,
      exists: false
    }
    this.userSignup = Auth.userSignup
  }

  onSubmit (e) {
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;

    //Axios request for signing up
    //Fires function from Auth that adds user to the database.  Bind this to the funtion.  See auth for next step.
    this.userSignup.call(this, username, password);
    //Resets form field to empty values.
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
      <div className="container">
        <div className="row">
          <div className="center-block">
            <form className="signup-form form-inline" id="signup" onSubmit={this.onSubmit.bind(this)}>
              <label>Username: </label>
              <input onChange={this.onChange.bind(this)} type="text" name="username" />
              <label>Password: </label>
              <input onChange={this.onChange.bind(this)} type="password" name="password" />
              <input type='submit'  value='Sign Up!'/>
              {this.state.signedUp ? <p>Sign Up Successful!</p> : null}
              {this.state.exists ? <p>Username Taken</p> : null}
            </form>
            </div>
          </div>
        </div>
      );
    };
}

export default SignUp
