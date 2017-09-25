import React from 'react';
import Header from './Header.jsx';
import Map from './Map.jsx';
import Pin from './Pin.jsx';
import api from '../../lib/api.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something: []
    }
    console.log('Hello');
  }

  componentDidMount() {
    console.log('INIT MAP FUNCTION ', api.initMap)
    api.renderMap()
  }

  render() {
    return (
      <div>
        <h1>asdfasdf</h1>
        <Header />
        <Pin />
      </div>
    );
  }
}

export default App
