import React from 'react';
import Nav from './Nav.jsx';
import Axios from 'axios';
import GOOGLE_API_KEY from '../../config/config.js';
import { connect } from 'react-redux';
import { dispatch } from 'redux';
import { mapUpdater } from '../redux/reducers.js';
import { markerUpdater } from '../redux/reducers.js';
import { googleUpdater } from '../redux/reducers.js';

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
      window.initMap = this.initMap;

      loadJS(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`);
    }

    partyInfo(obj) {

      this.dropNewPin(obj);

    }

    onClick(e) {
      e.preventDefault();

      console.log(this.state.partyInfo)

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
      let self = this;
      let myLatLng = {lat: 30.2672, lng: -97.7431}
      let map = new google.maps.Map(this.refs.map, {
          center: myLatLng,
          zoom: 12
      });
      self.setState({map: map});
      self.setState({myLatLng: myLatLng})
      this.dropNewPin = function (partyInfo, latLng = {lat: 30.2672, lng: -97.7431}, draggable = true) {
        let marker = new google.maps.Marker({
            position: latLng,
            map: this.state.map,
            draggable: draggable,
            icon: './images/blue-zone.png'
        });

        let infoWindow = new google.maps.InfoWindow({
          content: `hostname: ${partyInfo.name}, title: ${partyInfo.eventTitle}, description: ${partyInfo.Description}`
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });

        marker.addListener('dragend', function(){
          self.setState({lat: marker.getPosition().lat(), lng: marker.getPosition().lng()})
        })
        this.setState({partyInfo: partyInfo})
        this.setState({marker: marker})
      }
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

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

App = connect()(App);
export default App
