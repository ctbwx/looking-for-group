import React from 'react';
import GOOGLE_API_KEY from '../config/config.js';


export const initMap = () => {
  let self = this;
  let myLatLng = {lat: -34.397, lng: 150.644}
  let map = new google.maps.Map(self.refs.map, {
    center: myLatLng,
    zoom: 8
  });
}

export const renderMap = () => {
  loadJS(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`)
}

export const loadJS = (src) => {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
