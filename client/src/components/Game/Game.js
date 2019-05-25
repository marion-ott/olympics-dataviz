import React from 'react'
import './styles.scss'
import Map from '../Map/Map'
import Ranking from '../Ranking/Ranking'

class Game extends React.Component {
    render() {
        return(
            <div className="Game">
                {/* { this.state.countriesCount !== null && (
                    <p>Pays participants : {this.state.countriesCount}</p>
                )} */}
                <Map game={this.props.game.game} countries={this.props.game.countries} />
                <Ranking ranks={this.props.game.ranking} />
            </div>
        )
    }
}

export default Game