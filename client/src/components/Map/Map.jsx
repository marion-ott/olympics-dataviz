import React from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewport: {
            width: 400,
            height: 400,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8
        }
    }
    this.apiToken = "pk.eyJ1IjoibWFyaW9ub3R0IiwiYSI6ImNqdnl6aWc5ajBqaDIzenBrY2FncnIwY2gifQ.u-34sj9e4RIRyUD4l4A3PA"
};

render() { 
    return (
      <ReactMapGL
        mapboxApiAccessToken={this.apiToken}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default Map