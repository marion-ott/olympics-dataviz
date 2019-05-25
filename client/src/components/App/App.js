import React from 'react';
import './styles.scss';
// import ReactDOM from 'react-dom';
// import ReactFullpage from '@fullpage/react-fullpage';
import api from '../../api/api';
import Home from '../Home/Home'
// import WorldMap from '../WorldMap/WorldMap'
// import Map from '../Map/Map'
import Timeline from '../Timeline/Timeline'
import Game from '../Game/Game'
import Statistics from '../Statistics/Statistics';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            games: null
        }
        this.updateGame = this.updateGame.bind(this)
    }

    async componentWillMount() {
        const data = await api.getGames();
        const details = await api.getGameById(28);
        this.setState({
            games: data,
            game: details.game,
            sports: details.sports,
            countries: details.countries,
            ranking: details.ranking,
            countriesCount: details.countries.length
        });
    }

    async updateGame(event) {
        let gameId = event.target.id
        const details = await api.getGameById(gameId);
        this.setState({
            game: details.game,
            sports: details.sports,
            countries: details.countries,
            ranking: details.ranking,
            countriesCount: details.countries.length
        });
    }

    render() {
        return(
            this.state.games !== null ? (
                <div className="App">
                    {/* <WorldMap /> */}
                    <Home />
                    <Timeline games={this.state.games} updateGame={this.updateGame} />
                    {/* <Map game={this.state} /> */}
                    <Game game={this.state} />
                    <Statistics />
                </div>)
            : (<div>Loading</div>)
        )
    }
}

export default App;
