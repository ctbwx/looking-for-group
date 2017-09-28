import React from 'react'

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: true
    }
  }

  render() {
    return (
      <div>
        <p>World!</p>
      </div>
    );
  }
}

export default Map
