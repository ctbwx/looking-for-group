import React from 'react';
import { connect } from 'react-redux';

import GOOGLE_API_KEY from './../../config/config.js';
import GoogleApiComponent from './../../lib/GoogleApiComponent.js';
import Marker from './Pin.jsx';
import Map from './Map.jsx';
import Nav from './Nav.jsx';
/* import { connect } from 'react-redux';*/

const mapStateToProps = state => {
console.log(state)
    return {
        pos: state.pos
    }
}

const mapDispatchToProps = dispatch => {
   return {
     }
   }
const tester = ({ pos }) => (
    <div>
    Hello, {pos}
    </div>
)
const Container = (props) => (
    <div >
      <Map google={props.google} map={props.map}>
          {/* <Marker position={pos}/> */}
    {/* {<Nav google={this.props.google} />} */}
       </Map>
         Hello from Container
     </div>
)

const superContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(tester)

export { superContainer };

export default GoogleApiComponent({
    apiKey: GOOGLE_API_KEY
})(Container)
