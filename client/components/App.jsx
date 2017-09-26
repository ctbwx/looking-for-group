import React from 'react';
import Header from './Header.jsx';
import Map from './Map.jsx';
import Pin from './Pin.jsx';
import GOOGLE_API_KEY from './../../config/config.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: []
    }
    this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    // axios.get pins
     window.initMap = this.initMap;
     loadJS(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`)
  }

  initMap() {
    let myLatLng = {lat: 30.2672, lng: -97.7431}
    let map = new google.maps.Map(this.refs.map, {
      center: myLatLng,
      zoom: 12
    });
  }

  render() {
    return (
      <div
        ref="map"
        style={{height: '726px', width: '1280px'}}>
      </div>
    );
  }
}

const loadJS = (src) => {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default App
