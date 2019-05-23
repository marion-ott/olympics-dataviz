import React from 'react';
import './styles.scss';
// import ReactDOM from 'react-dom';
// import ReactFullpage from '@fullpage/react-fullpage';
import api from '../../api/api';
import Home from '../Home/Home'
import Timeline from '../Timeline/Timeline'
import Game from '../Game/Game'
import Statistics from '../Statistics/Statistics';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            games: null
        }
    }

    async componentWillMount() {
        const data = await api.getGames();
        const details = await api.getGameById(1);
        this.setState({
            games: data,
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
                    <Home />
                    <Timeline games={this.state.games} />
                    <Game game={this.state} />
                    <Statistics />
                </div>)
            : (<div>Loaging</div>)
        )
    }
}

export default App;
