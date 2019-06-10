import React from 'react'
import './styles.scss'
import Map from '../Map/Map'
import Ranking from '../Ranking/Ranking'
import Fact from '../Fact/Fact'
import Statistics from '../Dashboard/Dashboard'

class Game extends React.Component {
    render() {
        return(
            <div className="Game">
                <Map game={this.props.data.game} countries={this.props.data.countries} />
                <Statistics data={this.props.data} />
                <Fact fact={this.props.data.fact[0]} />
                <Ranking sports={this.props.data.sports} countries={this.props.data.countries} />
            </div>
        )
    }
}

export default Game