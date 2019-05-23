import React from 'react'
import api from '../../api/api'
import './styles.scss'
import Ranking from '../Ranking/Ranking'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: null,
            countriesCount: null,
            sports: null
        }
    }

    async componentWillMount() {
        const data = await api.getGameById(1);
        this.setState({
            game: data.game,
            sports: data.sports,
            countries: data.countries,
            ranking: data.ranking,
            countriesCount: data.countries.length
        });
    }

    render() {
        return(
            this.state.countries === null ? (<div>Loading</div>) : (
                <div className="Game">
                    {/* { this.state.countriesCount !== null && (
                        <p>Pays participants : {this.state.countriesCount}</p>
                    )} */}
                    <div className="Game_map">
                        {
                            this.state.countries.map((country, key) => (
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
                    </div>
                    <Ranking ranks={this.state.ranking} />
                </div>
            )
        )
    }
}

export default Game