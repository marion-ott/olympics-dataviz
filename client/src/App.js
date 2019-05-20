import React from 'react';
import api from './api/api';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        games: null
        }
    }

    async componentWillMount() {
        const data = await api.getGames();
        this.setState({
        games: data,
        });
    }

  render() {

    return(
        this.state.games === null ? (<div>loading</div>) 
        : this.state.games.map((game, key) => (
            <p key={key}>Les Jeux Olympiques de {game.year} se sont déroulés à {game.city_name} ({game.country_name}).</p>
        ))
    )
  }
}

export default App;
