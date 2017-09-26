import React from 'react';
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import PinDrop from './PinDrop.jsx';


class Nav extends React.Component  {
  constructor() {
    super();
    this.state = {
      logInVisible: false,
      signUpVisible: false,
      pinDropVisible: false
    }
  }

  clickListener1() {
    this.setState({logInVisible: !this.state.logInVisible});
    if (this.state.signUpVisible) {
      this.setState({signUpVisible: false});
    }
  }

  clickListener2() {
    this.setState({signUpVisible: !this.state.signUpVisible});
    if (this.state.logInVisible) {
      this.setState({logInVisible: false});
    }
  }

  clickListener3() {
    this.setState({pinDropVisible: !this.state.pinDropVisible});
  }

  render() {
    return (
      <div>
        <div >
          <nav >
            <ul>
              <li>
                <a href="#" onClick={() => this.clickListener1()}>Log In</a>
              </li>
              <li>
                <a href="#" onClick={() => this.clickListener2()}>Sign up</a>
              </li>
              <li>
                <a href="#" onClick={() => this.clickListener3()}>Drop Pin</a>
              </li>
            </ul>
          </nav>
        </div>
        {this.state.logInVisible ? <LogIn /> : null}
        {this.state.signUpVisible ? <SignUp /> : null}
        {this.state.pinDropVisible ? <PinDrop /> : null}
      </div>
    );
  };
};

export default Nav
