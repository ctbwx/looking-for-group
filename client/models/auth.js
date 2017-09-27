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
      context.props.sessionCheck();
    };
  })
  .catch(function (error) {
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
      context.props.sessionCheck();
    }
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const userLogout = () => {
  axios.get('/logout')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
};
