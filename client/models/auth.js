import React from 'react';
import axios from 'axios';

export const userLogin = function(username, password) {

  var context = this;
  axios.post('/login', {
    username: username,
    password: password
  })
  .then(function (response) {
    if(response.status === 200) {
      //If the user is logged in already, or the login is successful - fire sessionCheck function
      //See Nav for next step
      if(typeof response.data === 'string') {
        context.setState({alreadyLoggedIn: true, loggedIn: false, notFound: false})
      } else {
        context.setState({alreadyLoggedIn: false, loggedIn: true, notFound: false})
      }
      context.props.sessionCheck();
    };
  })
  .catch(function (error) {
    context.setState({alreadyLoggedIn: false, loggedIn: false, notFound: true});
    console.log(error);
  });
};

export const userSignup = function(username, password) {
  var context = this;
  axios.post('/signup', {
    username: username,
    password: password
  })
  .then(function (response) {
    if(response.status === 201  ) {
      context.setState({signedUp: true, exists: false});
      context.props.sessionCheck();
    }
  })
  .catch(function (error) {
    context.setState({signedUp: false, exists: true});
    console.log(error);
  });
};

export const userLogout = function() {
  console.log(this)
  axios.get('/logout')
  .then(function (response) {
    window.location.reload()
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
};
