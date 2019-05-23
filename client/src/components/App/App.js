import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactFullpage from '@fullpage/react-fullpage';
import api from '../../api/api';
import Home from '../Home/Home'
import Game from '../Game/Game'
import './styles.scss';

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
            <div className="App">
                <Home />
                <Game />
            </div>
        )
    }
}

export default App;
