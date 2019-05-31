import React from 'react'
import './styles.scss'

class Ranking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ranking: null
        }
        this.ranking = null
    }

    componentWillMount() {
        this.sortCountries()
    }

    sortCountries = () => {
        let ranking = this.props.countries.sort(function(a, b) {
            return parseFloat(b.medals.total) - parseFloat(a.medals.total)
        })
        this.ranking = ranking.slice(0,10)
        
    }

    render() {
        
        this.sortCountries()
        console.log(this.props)
        return(
            <section className="Ranking">
                <p className="Ranking_sectionTitle">Classement</p>
                <div className="Ranking_sports_selector">
                    <select name="sportSelect" defaultValue="all" id="">
                        <option value="all">Tous</option>
                        {
                            this.props.sports.map((sport, key) => (
                                <option key={key} value={sport.toLowerCase()}>{sport}</option>
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
                        { this.ranking.map((rank, key) => (
                            <div className="Ranking_table_rows_item" key={key}>
                                <div className="name">
                                    <p>
                                        <span className="rank">{key + 1}</span> 
                                        <img src={rank.flag} alt=""/>
                                        {rank.name}
                                    </p>
                                </div>
                                <div className="medals">
                                    <p className="gold">{rank.gold}</p>
                                    <p className="silver">{rank.silver}</p>
                                    <p className="bronze">{rank.bronze}</p>
                                    <p>{rank.total}</p>
                                </div>
                            </div>
                        )) }
                    </div>
                </div>
            </section>
        )
    }
}

export default Ranking