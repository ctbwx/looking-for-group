import React from 'react';
import Header from './Header.jsx';
import Map from './Map.jsx';
import Pin from './Pin.jsx';
import GOOGLE_API_KEY from '../../config/config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.initMap = this.initMap.bind(this)
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
    // so Google Maps can invoke it
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`)
  }

  initMap() {
    let myLatLng = {lat: -34.397, lng: 150.644}
    let map = new google.maps.Map(this.refs.map, {
      center: myLatLng,
      zoom: 8
    });
  }

  render() {
    return (
      <div>
        <Header />
          <div>
            <div ref="map" style={{height: '500px', width: '500px'}}></div>
          </div>
        <Pin />
      </div>
    );
  }
}


function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default App
