import React from 'react';
import axios from 'axios';

export const userLogin = (username, password) => {
  axios.post('/login', {
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const userSignup = (username, password) => {
  axios.post('/signup', {
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
};
