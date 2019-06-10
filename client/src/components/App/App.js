import React from 'react';
import './styles.scss';
// import ReactDOM from 'react-dom';
import api from '../../api/api';
import Home from '../Home/Home'
import Timeline from '../Timeline/Timeline'
import Game from '../Game/Game'

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
        const details = await api.getGameById(1);
        
        this.setState({
            games: data,
            game: details.game,
            fact: details.fact,
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
            fact: details.fact,
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
                    <Game data={this.state} updateGame={this.updateGame} />
                </div>)
            : (<div>Loading</div>)
        )
    }
}

export default App;
