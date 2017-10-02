import React from 'react';
import Nav from './Nav.jsx';
import Axios from 'axios';
import GOOGLE_API_KEY from '../../config/config.js';

// Parent container of the app 
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            party: '',
            initMap: this.initMap,
            myLatLng: this.myLatLng,
            map: null,
            dropNewPin: null,
            marker: {}
        }
        this.initMap = this.initMap.bind(this);
        this.partyInfo = this.partyInfo.bind(this);
    }

    componentDidMount() {
  //  Google Maps API call brings google maps into the app:
        window.initMap = this.initMap;
      loadJS(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`);
    }

    partyInfo(obj) {
// Creates a new pin to be dropped onto the map, with the host & party info coming from PinDrop.jsx text input forms.
      this.dropNewPin(obj);
    }

    onClick(e) {
      e.preventDefault();
// This click handler gets passed down to PinDrop.jsx. It takes the host & party info created by the user, along with the latitude and longitude of the pin, and posts that info to the database.
      Axios.post('/new-pin', {
        name: this.state.partyInfo.name,
        title: this.state.partyInfo.eventTitle,
        description: this.state.partyInfo.Description,
        longitude: this.state.lng,
        latitude: this.state.lat
      }).then(function(response){
        console.log(response)
      });
    }

    initMap() {
// This renders the map that takes up most of the screen. This function, along with the GoogleAPI Key is passed to loadJS inside ComponentDidMount as the callback. This is what allows google to send us back the map we request. 
        let self = this;
        // this is the latitude and longitude for Austin, which is the default location of the map.
        let myLatLng = {lat: 30.2672, lng: -97.7431}
        // Here is how you create a new instance of a google map, and comes straight from the google maps API. Center and Zoom are the two necessary keys you must give google maps in order to get a map. 
      let map = new google.maps.Map(this.refs.map, {
          center: myLatLng,
          zoom: 12
      });
      self.setState({map: map});
        self.setState({myLatLng: myLatLng})
        // dropNewPin creates a new google maps Marker (what we often call a pin in this app).
        // Position is the latitude and longitude. Icon is a custom icon, which is found in the images file. If you leave it blank, you get a typical google balloon shape pin.  
      this.dropNewPin = function (partyInfo, latLng = {lat: 30.2672, lng: -97.7431}, draggable = true) {
        let marker = new google.maps.Marker({
            position: latLng,
            map: this.state.map,
            draggable: draggable,
            icon: './images/Polygon.png'
        });

// This is the infoWindow that pops up if you click the marker/pin. It contains the information about each party that is being hosted. 
        let infoWindow = new google.maps.InfoWindow({
          content: `hostname: ${partyInfo.name}, title: ${partyInfo.eventTitle}, description: ${partyInfo.Description}`
        });
// This addListener is also from googleapis: it sets the infoWindow we just created to be part of the Marker.
        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
// This googleapis addListener listens for the 'dragend' event which gets fired when a user drags a marker/pin to another location on the map. The getPosition().lat() and .lng() gets the latitude and longitude of the location where the pin has been dragged. 
        marker.addListener('dragend', function(){
          self.setState({lat: marker.getPosition().lat(), lng: marker.getPosition().lng()})
        })
        this.setState({partyInfo: partyInfo})
        this.setState({marker: marker})
      }
// Here, we ensure that all of the pins/makers (representing parties) are rendered on the map when a user goes to our home page. We use an axios get request to retrieve the stored pins, with the party information, from the database. Then, we use the google.maps.Marker functionality from dropNewPin to re-create the marker and set it to the map. Since we stored the latitude and longitude in the database, we can use that to make sure that each marker/pin is set to the correct location. 
      self.setState({dropNewPin: this.dropNewPin.bind(this)})
      Axios.get('/get-pins')
        .then((res) => {
          res.data.forEach(pin => {
            // this.setState({marker: pin});
            console.log("pin data",pin)
            let latLng = {lat: pin.latitude, lng: pin.longitude};
            this.dropNewPin(
              {
                name: pin.name,
                eventTitle: pin.title,
                Description: pin.description
              },
              latLng, false);
        });
      })
    }
// Renders the map, and calls the Nav component, passing down the relevant props. 
    render() {
        return (
             <div>
                 <Nav clickFromApp={this.state.dropNewPin}
                      initMap={this.initMap.bind(this)}
                      partyInfo={this.partyInfo.bind(this)}
                      onClick={this.onClick.bind(this)}
                      />
                <div
                    ref="map"
                    style={{height: '100vh', width: '100vw'}}>
                </div>
            </div>
        );
    }
}
// I have included the link for where we found this code in the read-me. It was the simplest way of getting google maps to work with react, short of downloading some library that would have been a black box. If you attempt to follow the instructions on googleapis of how to integrate maps into your app, the instructions work perfectly well for html, but do not easily work with react. 
function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default App
