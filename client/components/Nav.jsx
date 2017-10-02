import React from 'react';
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import PinDrop from './PinDrop.jsx';
// import Marker from './Pin.jsx';
import Map from './Map.jsx';
import * as Auth from './../../client/models/auth.js';
import { connect } from 'react-redux';
import { mapUpdater } from '../redux/reducers.js';
import { markerUpdater } from '../redux/reducers.js';
import { googleUpdater } from '../redux/reducers.js';
import App from './App.jsx';

class Nav extends React.Component  {
  constructor(props) {
      super(props);
    this.state = {
      userLoggedIn: false,
      logInVisible: false,
      signUpVisible: false,
      pinDropVisible: false,
        sessionCheck: this.sessionCheck,
    }
      this.clickListener3 = this.clickListener3.bind(this);
  }
    sessionCheck() {
    //When this function is triggered, the user will then have access to pin dropping.
    this.setState({userLoggedIn: true});
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
    this.props.clickfromApp();
  }

  clickListener4() {
    Auth.userLogout();
    this.setState({userLoggedIn: false})
  }

  render() {
    return (
      <div className="nav-border row">
        <div className="nav">
          <nav >
            <ul className="list-inline">
              <li>
                <h1>Looking-For-Group</h1>
              </li>
              <li >
                <a href="#" onClick={() => this.clickListener1()}>Log In</a>
              </li>
              <li >
                <a href="#" onClick={() => this.clickListener2()}>Sign Up</a>
              </li>
              {this.state.userLoggedIn ?
              <li >
                <a href="#" onClick={() => this.clickListener3()}>Drop Pin</a>
              </li> : null}
              <li >
                <a href="#" onClick={() => this.clickListener4()}>Log Out</a>
              </li>
            </ul>
          </nav>
        </div>
        {this.state.logInVisible ? <LogIn sessionCheck={this.state.sessionCheck.bind(this)}/> : null}
        {this.state.signUpVisible ? <SignUp sessionCheck={this.state.sessionCheck.bind(this)}/> : null}
        {/*this.state.pinDropVisible ? <Marker position={this.props.position} /> : null*/}
      </div>
    );
  };
};


const mapStateToProps = (state) => {
    return {map: state.map, marker: state.marker, google: state.google}
};

export default Nav = connect(
    mapStateToProps
) (Nav);
