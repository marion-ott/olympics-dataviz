import React from 'react'
import './styles.scss'
import Timeline from '../Timeline/Timeline'
import Map from '../Map/Map'
import Ranking from '../Ranking/Ranking'
import Fact from '../Fact/Fact'
import Statistics from '../Statistics/Statistics'

class Game extends React.Component {
    render() {
        return(
            <div className="Game">
                <Timeline games={this.props.data.games} updateGame={this.props.updateGame} />
                <Map game={this.props.data.game} countries={this.props.data.countries} />
                <Statistics data={this.props.data} />
                <Fact data={this.props.data.game[0]} />
                <Ranking ranks={this.props.data.ranking} />
            </div>
        )
    }
}

export default Game