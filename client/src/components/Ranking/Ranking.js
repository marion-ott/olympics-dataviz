import React from 'react'
import ReactDOM from 'react-dom'
import Chart from '../Chart/Chart'
import './styles.scss'

class Ranking extends React.Component {

    componentWillMount() {
        this.sortCountries()
    }

    componentWillReceiveProps(newProps) {
        this.props = newProps
        ReactDOM.findDOMNode(this).querySelector('select').value = ''
        this.sortCountries()
    }

    sortCountries = () => {
        let ranking = this.props.countries.sort(function(a, b) {
            return parseFloat(b.medals.total) - parseFloat(a.medals.total)
        }).slice(0,10)

        this.setState({
            countries: ranking
        })
    }

    selectSport = (event) => {
        
        const selectedSport = event.target.value !== 'all' ? parseFloat(event.target.value) : 'all'
        if(event.target.value === 'all') {
            this.sortCountries()
        } else {
            let filteredCountries = this.props.countries.map(country => {
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
    }
    
    render() {
        let test = [this.props.countries[0].medals.total, (this.props.countries[0].male + this.props.countries[0].female - this.props.countries[0].medals.total)]
        return(
            <section className="Ranking">
                <p className="Ranking_sectionTitle">Classement</p>
                <div className="Ranking_table">
                    <div className="Ranking_sports_selector">
                        <label htmlFor="sportSelect">Filter par discipline :</label>
                        <select name="sportSelect" defaultValue="all" id="" onChange={this.selectSport}>
                            <option value="all">Tous</option>
                            {
                                this.props.sports.map((sport, key) => (
                                    <option key={key} value={sport.id}>{sport.sport_name}</option>
                                ))
                            }
                        </select>
                        <div></div>
                    </div>
                    <div className="Ranking_table_rows">
                        <div className="Ranking_table_rows_legend">
                            <div className="name">
                                <p>Pays</p>
                            </div>
                            <div className="medals">
                                <div className="medals_container">
                                    <div className="goldMedal"></div>
                                </div>
                                <div className="medals_container">
                                    <div className="silverMedal"></div>
                                </div>
                                <div className="medals_container">
                                    <div className="bronzeMedal"></div>
                                </div>
                                <p className="medals_container">Total</p>
                            </div>
                        </div>
                        {
                            this.state.countries.map((country, key) => {
                                let gold = 0
                                let silver = 0
                                let bronze = 0
                                
                                country.results.forEach(result => {
                                    gold = gold + result.male.gold + result.female.gold + result.neutral.gold
                                    silver = silver + result.male.silver + result.female.silver + result.neutral.silver
                                    bronze = bronze + result.male.bronze + result.female.bronze + result.neutral.bronze
                                })

                                return(
                                    <div className="Ranking_table_rows_item" key={key}>
                                        <div className="name">
                                            <p>
                                                <span className="rank">{key + 1}</span> 
                                                <img src={country.flag} alt=""/>
                                                {country.name}
                                            </p>
                                        </div>
                                        <div className="medals">
                                            <p className="gold">{gold}</p>
                                            <p className="silver">{silver}</p>
                                            <p className="bronze">{bronze}</p>
                                            <p>{gold + silver + bronze}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="Ranking_graphs">
                    <h4>Comparez le ratio médailles / athlètes</h4>
                    <div className="Ranking_graphs_option">
                        <input type="text" list="countries" onChange={this._onChange} />
                        <datalist id="countries">
                            {this.props.countries.map((country, key) =>
                                <option key={key} value={country.name} />
                            )}
                        </datalist> 
                        <Chart 
                            legend={false}
                            title={false}
                            labels={[this.props.countries[0].name]}
                            dataset={test}
                            type="ratio"
                            shape="doughnut" 
                            height={500}
                            // width={30 * this.state.data.length}
                        />
                    </div>
                    <div className="Ranking_graphs_option">
                        <input type="text" list="countries" onChange={this._onChange} />
                        <datalist id="countries">
                            {this.props.countries.map((country, key) =>
                                <option key={key} value={country.name} />
                            )}
                        </datalist> 
                    </div>
                </div>
            </section>
        )
    }
}

export default Ranking