import React from 'react'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    }
  }

  render() {
    return (
      <h1>Hello</h1>
    );
  }
}

export default Header
