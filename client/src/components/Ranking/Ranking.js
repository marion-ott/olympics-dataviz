import React from 'react'
import './styles.scss'

class Ranking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ranking: null
        }
        this.countries = this.props.countries
        this.ranking = this.props.countries
    }

    componentWillMount() {
        // this.sortCountries()
        let ranking = this.props.countries.sort(function(a, b) {
            return parseFloat(b.medals.total) - parseFloat(a.medals.total)
        })
        this.ranking = ranking.slice(0,10)

    }

    componentWillReceiveProps(newProps) {
        this.props = newProps
        console.log('new prop : ', this.props)
    }

    componentDidUpdate() {
        // reset all blocks
        // this._blocs.map((block)=> {
        //     ReactDOM.findDOMNode(block).style.top = '100%'
        //     ReactDOM.findDOMNode(block).style.zIndex = 'initial'
        // })

        // // set first block as defaut
        // const firstBloc = this._blocs[0]
        // ReactDOM.findDOMNode(firstBloc).style.top = 0
    }


    sortCountries = () => {
        if(!this.filtering) {
            let ranking = this.props.countries.sort(function(a, b) {
                return parseFloat(b.medals.total) - parseFloat(a.medals.total)
            })
            this.ranking = ranking.slice(0,10)
        } 
        //console.log('sort countries');
        this.filtering = false
    }

    renderRank = () => {
        
    }



    selectSport = (event) => {
        
        const selectedSport = event.target.value
        let filteredBySport = this.props.countries.map(country => {
            return country.results.filter(result => result.sportId == selectedSport)
        }).filter(country => country.length > 0)
        console.log(filteredBySport)

        // let rankFilteredCountries = filteredBySport.sort(function(a, b) {
        //     return parseFloat(b.medals.total) - parseFloat(a.medals.total)
        // })

        this.ranking = filteredBySport
        // console.log(this.ranking)
        this.filtering = true
        this.forceUpdate()
    }
    
    render() {
        
        // console.log(this.ranking);
        //this.sortCountries()
        console.log('render props : ', this.props)
        return(
            <section className="Ranking">
                <p className="Ranking_sectionTitle">Classement</p>
                <div className="Ranking_sports_selector">
                    <select name="sportSelect" defaultValue="all" id="" onChange={this.selectSport}>
                        <option value="all">Tous</option>
                        {
                            this.props.sports.map((sport, key) => (
                                <option key={key} value={sport.id}>{sport.sport_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="Ranking_table">
                    <div className="Ranking_table_rows">
                        <div className="Ranking_table_rows_legend">
                            <div className="name">
                                <p>Pays</p>
                            </div>
                            <div className="medals">
                                <p className="gold">Or</p>
                                <p className="silver">Argent</p>
                                <p className="bronze">Bronze</p>
                                <p>Total</p>
                            </div>
                        </div>
                        {
                            this.ranking.map((country, key) => {
                                let gold = 0
                                let silver = 0
                                let bronze = 0
                                country.results.forEach(result => {
                                    switch(result.medal) {
                                        case 1:
                                            gold = gold + result.amount
                                            break;
                                        case 2:
                                            silver = silver + result.amount
                                            break;
                                        case 3:
                                            bronze = bronze + result.amount
                                            break;
                                        default:
                                            break;
                                    }
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
            </section>
        )
    }
}

export default Ranking