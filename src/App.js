import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types'
import './App.css';

// Stateless component are those that have no state

let Greeting = (props) =>{
  const {name, age} = props;
  return <h1>hello {name} your age must be ({age})!</h1>
}
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age : PropTypes.number
}
export default Greeting;