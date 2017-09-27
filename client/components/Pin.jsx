import React from 'react';
import Map from './Map.jsx';

export default class Marker extends React.Component {

    constructor(props) {
        super(props);
    }

    /* Marker.propTypes = {
     *     position: React.PropTypes.object,
     *     map: React.PropTypes.object
     * }
     */
    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }

    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
        }}

    renderMarker() {
        let {
            map, google, position, mapCenter
        } = this.props;

        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = {
            map: map,
            position: position,
            draggable: true
        };
        this.marker = new google.maps.Marker(pref);

        const evtNames = ['click', 'mouseover'];
        evtNames.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e));
        })
    }

    handleEvent(evtName) {
        return (e) => {
            const evtName = `on${camelize(evt)}`
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.marker, e);
            }
        }
    }

    render () {
        return null;
    }

}

