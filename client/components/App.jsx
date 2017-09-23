import React from 'react';
import Header from './Header.jsx';
import Map from './Map.jsx';
import Pin from './Pin.jsx';
import { initMap, loadJS, renderMap } from '../../utils/utils.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.initMap = initMap.bind(this);
    this.renderMap = renderMap.bind(this);
  };

  componentDidMount() {
    console.log('INIT MAP FUNCTION ', this.initMap)

    this.renderMap()
  };


  render() {
    return (
      <div>
        <h1>IS THIS WORKING OR WHAT???</h1>
        <Header />
          <div>
            <div ref="map" style={{height: '500px', width: '500px'}}></div>
          </div>
        <Pin />
      </div>
    );
  };
};

export default App
