import React from 'react'
import api from '../../api/api'
import './styles.scss'
import Map from '../Map/Map'
import Ranking from '../Ranking/Ranking'

class Game extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return(
            <div className="Game">
                {/* { this.state.countriesCount !== null && (
                    <p>Pays participants : {this.state.countriesCount}</p>
                )} */}
                <Map countries={this.props.game.countries} />
                <Ranking ranks={this.props.game.ranking} />
            </div>
        )
    }
}

export default Game