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
        <div className="Map">
            {
                this.props.countries.map((country, key) => (
                    <div key={key} className="Game_item">
                        <div className="Game_item_head">
                            <img src={country.flag} alt={`Drapeau du pays ${country.name}`}/>
                            <h2>{country.name}</h2>
                        </div>
                        <div className="Game_item_infos">
                            <div className="Game_item_infos_athletes">
                                <h4>Athlètes</h4>
                                <div>
                                    <p>Hommes : <span>{country.male}</span></p>
                                    <p>Femmes : <span>{country.female}</span></p>
                                </div>
                            </div>
                            <div className="Game_item_infos_results">
                                <div className="Game_item_results_single">
                                    <div className="gold"></div>
                                    <p>{country.medals.gold}</p>
                                </div>
                                <div className="Game_item_results_single">
                                    <div className="silver"></div>
                                    <p>{country.medals.silver}</p>
                                </div>
                                <div className="Game_item_results_single">
                                    <div className="bronze"></div>
                                    <p>{country.medals.bronze}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {/** <ReactMapGL
            mapboxApiAccessToken={this.apiToken}
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}
            />*/}

        </div>
    );
  }
}

export default Map