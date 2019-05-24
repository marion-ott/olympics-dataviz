import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Tooltip from './Tooltip/Tooltip'
import './styles.scss'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW9ub3R0IiwiYSI6ImNqdnl6aWc5ajBqaDIzenBrY2FncnIwY2gifQ.u-34sj9e4RIRyUD4l4A3PA';

class WorldMap extends React.Component {
  tooltipContainer;

  setTooltip(features) {
    if (features.length) {
      ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        this.tooltipContainer
      );
    } else {
        ReactDOM.unmountComponentAtNode(this.tooltipContainer)
    }
  }

  componentDidMount() {

    // Container to put React generated content in.
    this.tooltipContainer = document.createElement('div');

    //marionott.7z897rzr
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-9.38, 43.65],
      zoom: 1,
      minZoom: 1,
      maxZoom: 3
    });

    const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
      offset: [-120, 0]
    }).setLngLat([0,0]).addTo(map);
   

    map.on('load', () => {
        let data = require('./countries.geojson')
        map.addSource("countries", {
            "type": "geojson",
            "data": data
        });
        
        map.addLayer({
            "id": "countries-layer",
            "type": "fill",
            "source": "countries",
            "layout": {},
            "paint": {
                "fill-color": "#627BC1",
                "fill-opacity": 0.5
            }
        });
    })

    map.on('click', 'countries-layer', function (e) {
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.name)
        .addTo(map);
    });

    // map.on('mousemove', (e) => {
    //   const features = map.queryRenderedFeatures(e.point);      
    //   tooltip.setLngLat(e.lngLat);
    //   map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    // //   this.setTooltip(features);
    // });
  }

  render() {
    return (
        <div className="Map">
            <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        </div>
    );
  }
}

export default WorldMap
