import React from 'react'
import './styles.scss'
import Timeline from '../Timeline/Timeline'
import Map from '../Map/Map'
import Ranking from '../Ranking/Ranking'
import Statistics from '../Statistics/Statistics'

class Game extends React.Component {
    render() {
        console.log(this.props.data.game[0].year)
        return(
            <div className="Game">
                <Timeline games={this.props.data.games} updateGame={this.props.updateGame} />
                <Map game={this.props.data.game} countries={this.props.data.countries} />
                <Statistics />
                <Ranking ranks={this.props.data.ranking} />
            </div>
        )
    }
}

export default Game