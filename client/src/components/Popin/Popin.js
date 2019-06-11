import React from 'react'
import './styles.scss'
import Chart from '../Chart/Chart'

class Popin extends React.Component {
    
    componentWillMount() {
        //TODO: Create animation for popin appearing
        this.setState({
            sports: this.props.data.sports
        })
    }
    
    componentWillUnmount() {
        console.log('popin unmount')
    }

    handleClick = (event) => {
        if(event.target.className === 'Popin') {
            //TODO: Create animation for popin diappearing
            //then call appropriate function
            this.props.closePopin()
        }
    }

    selectSport = (event) => {
        const selectedSport = parseFloat(event.target.value)

        let filteredCountries = this.props.data.countries.map(country => {
            let selectedCountry = {}
            selectedCountry.results = country.results.filter(result => result.sportId === selectedSport)
            selectedCountry.name = country.name
            selectedCountry.flag = country.flag
            let medalCount = {
                gold: 0,
                silver: 0,
                bronze: 0,
                total: 0
            }
            selectedCountry.results.forEach(result => {
                medalCount.gold = medalCount.gold + result.male.gold + result.female.gold + result.neutral.gold
                medalCount.silver = medalCount.silver + result.male.silver + result.female.silver + result.neutral.silver
                medalCount.bronze = medalCount.bronze + result.male.bronze + result.female.bronze + result.neutral.bronze
            })
            medalCount.total = medalCount.gold + medalCount.silver + medalCount.bronze
            selectedCountry.medals = medalCount
            return selectedCountry
        })

        let rankingBySport = filteredCountries.sort((a, b) => (b.medals.total - a.medals.total || b.medals.gold - a.medals.gold || b.medals.silver - a.medals.silver || b.medals.bronze - a.medals.bronze)).slice(0,10)

        this.setState({
            countries: rankingBySport
        })
    }

    render() {
        console.log(this.props)

        return(
            this.props.id === 'sport' ? (
                <div onClick={this.handleClick} id={this.props.id} className="Popin">
                    <div className="Popin_container">
                        <span onClick={this.props.closePopin}>X</span>
                        <div className="Popin_container_list">
                            <h4>Les disciplines<br/>en compétition :</h4>
                            <ul className={this.props.data.sports.length > 14 ? 'columns' : ''}>
                                { this.props.data.sports.map((sport, key) => {
                                    return(
                                        <li key={key}>{sport.sport_name}</li>
                                    )
                                }) }
                            </ul>
                        </div>
                        <div className="Popin_graph">
                        <Chart 
                            labels={this.props.data.sports.map(sport => sport.sport_name)}
                            dataset={this.maxRatio.map(country => country.ratio)}
                            type="ratio"
                            shape="bar" 
                        />
                        </div>
                    </div>
                </div>
            ) : (
                <div onClick={this.handleClick} id={this.props.id} className="Popin">
                    <div className="Popin_container">
                        <span onClick={this.props.closePopin}>X</span>
                        <div className="Popin_container_list">
                            <h4>Les pays en compétition :</h4>
                            <ul className={this.props.data.countries.length > 14 ? 'columns' : ''}>
                                { this.props.data.countries.map((country, key) => {
                                    return(
                                        <li key={key}>{country.name}</li>
                                    )
                                }) }
                            </ul>
                        </div>
                        <div className="Popin_graph"></div>
                    </div>
                </div>
            )
        )
    }
}

export default Popin