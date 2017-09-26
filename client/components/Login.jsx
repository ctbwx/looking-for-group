import React from 'react'

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
        <form className="login-form" onSubmit={this.onSubmit.bind(this)}>
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
