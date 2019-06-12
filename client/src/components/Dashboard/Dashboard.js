import React from 'react'
// import ReactDOM from 'react-dom'
import './styles.scss'
import MoreInfo from '../MoreInfo/MoreInfo'
import Popin from '../Popin/Popin'
import Chart from '../Chart/Chart'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayAmount: true,
            displayRatio: false,
            graphData: this.maxAmount
        }
        this.amountBtn = null
        this.ratioBtn = null
        this.maxAmount = this.props.data.countries.sort(function(a, b) {
            return parseFloat(b.female) - parseFloat(a.female)
        }).slice(0,10)
    
        this.maxRatio = this.props.data.countries.sort(function(a, b) {
            return parseFloat(b.ratio) - parseFloat(a.ratio)
        }).slice(0,10)
    
        this.malePercentage = Math.round((this.props.data.game[0].male / (this.props.data.game[0].female + this.props.data.game[0].male)) * 100)
    }

    changeGraph = (event) => {
        let displayAmount;
        let displayRatio;
        let btnAction = event.target.id
        switch(btnAction) {
            case 'amount':
                displayAmount = true
                displayRatio = false
                this.amountBtn.classList.add('selected')
                this.amountBtn.classList.remove('unSelected')
                this.ratioBtn.classList.remove('selected')
                this.ratioBtn.classList.add('unSelected')
                break;
            case 'ratio':
                    displayAmount = false
                    displayRatio = true
                    this.amountBtn.classList.remove('selected')
                    this.amountBtn.classList.add('unSelected')
                    this.ratioBtn.classList.remove('unSelected')
                    this.ratioBtn.classList.add('selected')
                    break;
            default:
                break;
        }

        let graphData = displayRatio ? this.maxRatio : this.maxAmount

        this.setState({
            displayAmount,
            displayRatio,
            graphData 
        })
    }

    openPopin = (event) => {
        //TODO: Fonction pour ouver une popin
        // écouter l'événement pour ouvrir la popin appropriée
        // et set le state correspondant pour appeler le render
        switch(event.target.id) {
            case 'sports': 
                this.setState({
                    showSportsPopin: true,
                    showCountriesPopin: false
                })
                break;
            case 'countries': 
                this.setState({
                    showSportsPopin: false,
                    showCountriesPopin: true
                })
                break;
            default:
                break;
        }
    }

    closePopin = () => {
        //TODO: Fonction pour refermer une popin
        // et set le state showSportPopin & showCountryPopin à FALSE
        console.log("closing")
        this.setState({
            showSportsPopin: false,
            showCountriesPopin: false
        })
    }

    
    render() {
        this.maxAmount = this.props.data.countries.sort(function(a, b) {
            return parseFloat(b.female) - parseFloat(a.female)
        }).slice(0,10)
    
        this.maxRatio = this.props.data.countries.sort(function(a, b) {
            return parseFloat(b.ratio) - parseFloat(a.ratio)
        }).slice(0,10)
    
        this.malePercentage = Math.round((this.props.data.game[0].male / (this.props.data.game[0].female + this.props.data.game[0].male)) * 100)

        return(
            <section className="Dashboard">
                <div className="Dashboard_infos">
                    <div className="Dashboard_infos_year">
                        <span>Année</span>
                        <h5>{this.props.data.game[0].year}</h5>
                    </div>
                    <div className="Dashboard_infos_details">
                        <div className="Dashboard_infos_details_location">
                            <div>
                                <span>Pays hôte</span>
                                <p>{this.props.data.game[0].country_name}</p>
                            </div>
                            <div>
                                <span>Ville hôte</span>
                                <p>{this.props.data.game[0].city_name}</p>
                            </div>
                        </div>
                        <div className="Dashboard_infos_details_numbers">
                            <div className="nations">
                                <p>{this.props.data.countries.length}</p>
                                <span>Pays participants</span>
                                {/* <div className="moreInfo">
                                    <MoreInfo id="countries" onClick={this.openPopin} />
                                </div> */}
                            </div>
                            <div className="sports">
                                <p>{this.props.data.sports.length}</p>
                                <span>Disciplines</span>
                                <div className="moreInfo">
                                    <MoreInfo id="sports" onClick={this.openPopin} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Dashboard_athletes">
                    <div className="top">
                        <h4>La parité aux<br/>Jeux Olympiques de {this.props.data.game[0].year}</h4>
                        <div className="Dashboard_athletes_text">
                            <div className="scale">
                                <div className="scale_visual">
                                    <div className="total"></div>
                                    <div className="male" style={{ height: `${this.malePercentage}%`}}></div>
                                </div>
                                <div className="scale_explanation">
                                    <div className="scale_explanation_male">
                                        <p>{this.props.data.game[0].male}</p>
                                        <img src={`${process.env.PUBLIC_URL}assets/img/male-icon.png`} alt=""/>
                                    </div>
                                    <div className="scale_explanation_female">
                                        <p>{this.props.data.game[0].female}</p>
                                        <img src={`${process.env.PUBLIC_URL}assets/img/female-icon.png`} alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="stats">
                                <div className="amount">
                                    <span>Pays comptant le plus de femmes atlètes :</span>
                                    <p>{this.maxAmount[0].name} <span className="details">({this.maxAmount[0].female} femmes)</span></p>
                                </div>
                                <div className="ratio">
                                    <span>Pays avec le ratio de femmes le plus important :</span>
                                    <p>{this.maxRatio[0].name} <span className="details">({Math.round(this.maxRatio[0].ratio * 100)}% de femmes)</span></p>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="bottom">
                        <div className="Dashboard_athletes_selector">
                            <div ref={el => this.amountBtn = el} className="selected" id="amount" onClick={(event) => this.changeGraph(event)}>Nombre</div>
                            <div ref={el => this.ratioBtn = el} className="unSelected" id="ratio" onClick={(event) => this.changeGraph(event)}>Ratio</div>
                        </div>
                        <div className="Dashboard_athletes_graph">
                            <h4>{this.state.displayRatio ? 'Ratio' : 'Nombre'} d'athlètes femmes par pays</h4>
                            <div className="Dashboard_athletes_graph_visual"></div>
                            <div>
                                {
                                    this.state.displayRatio ? (
                                        <Chart 
                                            legend={false}
                                            labels={this.maxRatio.map(country => {
                                                if (country.name.length > 12)
                                                    return country.code;
                                                else
                                                    return country.name;
                                            })}
                                            dataset={this.maxRatio.map(country => country.ratio)}
                                            type="ratio"
                                            fontFamily="Signika"
                                            shape="horizontal" 
                                            height={220}
                                            width={400}
                                        />
                                    ) : (
                                        <Chart 
                                            legend={false}
                                            labels={this.maxAmount.map(country => {
                                                if (country.name.length > 12)
                                                    return country.code;
                                                else
                                                    return country.name;
                                            })}
                                            dataset={this.maxAmount.map(country => country.female)}
                                            type="amount"
                                            fontFamily="Signika"
                                            shape="horizontal" 
                                            height={220}
                                            width={400}
                                        />
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.showSportsPopin && (
                        <Popin data={this.props.data} id="sport" closePopin={this.closePopin} />
                    )
                }
            </section>
        )
    }
}

export default Dashboard;