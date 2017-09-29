import React from 'react';
import Nav from './Nav.jsx';
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
            initMap: this.initMap,
            myLatLng: this.myLatLng,
            map: null,
            dropNewPin: null
        }
        this.initMap = this.initMap.bind(this);
    }

    componentDidMount() {
        window.initMap = this.initMap;
        loadJS(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`);
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
        this.dropNewPin = function () {
            let marker = new google.maps.Marker({
                position: this.state.myLatLng,
                map: this.state.map,
                draggable: true
            });
        }
        self.setState({dropNewPin: this.dropNewPin.bind(this)})
    }


    render() {
        return (
             <div>
                 <Nav clickfromApp={this.state.dropNewPin}
                      initMap={this.initMap.bind(this)} />
                <div
                    ref="map"
                    style={{height: '500px', width: '500px'}}>
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
