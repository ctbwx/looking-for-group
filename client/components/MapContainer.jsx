import React from 'react';

export class Container extends React.Component {
    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        }
        const pos = {lat: 30.2672, lng: -97.7431}
        return (
            <div style={style}>
                <Map google={this.props.google}>
                    <Marker />
                    <Marker position={pos}/>
                    <Map/>
            </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: GOOGLE_API_KEY
})(Container)
