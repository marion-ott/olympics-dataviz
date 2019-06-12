import React from 'react';
import './styles.scss';
import ReactDOM from 'react-dom';
import api from '../../api/api';
import Loader from '../Loader/Loader'
import Home from '../Home/Home'
import Timeline from '../Timeline/Timeline'
import Game from '../Game/Game'
import Chart from '../Chart/Chart'
import Global from '../Global/Global'
import global from '../../json/global.json'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            games: null,
            loading: true
        }
        this.updateGame = this.updateGame.bind(this)
        this.globalIsOpen = false
    }

    state = {
        loading: true
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

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 5000)
    }

    async updateGame(event) {
        let gameId = event.target.dataset.index
        ReactDOM.findDOMNode(this).querySelector('.Timeline_item.clicked').classList.remove('clicked')
        console.log(event.target)
        event.target.classList.add('clicked')
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

    toggleGlobal = () => {
        if(!this.globalIsOpen) {
            ReactDOM.findDOMNode(this).querySelector('.Global').style.left = '0px'
            this.globalIsOpen = !this.globalIsOpen
        } else {
            ReactDOM.findDOMNode(this).querySelector('.Global').style.left = '-100%'
            this.globalIsOpen = !this.globalIsOpen
        }
    }

    render() {
        if (this.state.loading) {
              {/*return (
                <Loader />
            )*/}
        }
        return(
            this.state.games !== null ? (
                <div className="App">
                    {/* <WorldMap /> */}

                    <Home />
                    <Timeline toggleGlobal={this.toggleGlobal} games={this.state.games} updateGame={this.updateGame} />
                    <Game data={this.state} updateGame={this.updateGame} />
                    <Global toggleGlobal={this.toggleGlobal} data={globalData} />
                </div>)
            : (<div>Loading</div>)
        )
    }
}

export default App;
