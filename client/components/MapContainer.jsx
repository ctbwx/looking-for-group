import React from 'react';
import GOOGLE_API_KEY from './../../config/config.js';
import GoogleApiComponent from './../../lib/GoogleApiComponent.js';
import Marker from './Pin.jsx';
import Map from './Map.jsx';

class Container extends React.Component {
    render() {
        const pos = {lat: 30.2672, lng: -97.7431}
        return (
            <div >
                <Map google={this.props.google}>
                    <Marker position={pos}/>
                </Map>
                Hello from Container
            </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: GOOGLE_API_KEY
})(Container)
