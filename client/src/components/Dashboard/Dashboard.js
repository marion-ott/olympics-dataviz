import React from 'react'
// import ReactDOM from 'react-dom'
import './styles.scss'
import MoreInfo from '../MoreInfo/MoreInfo'
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


    componentDidMount() {
        
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

    openPopin = () => {
        //TODO: Fonction pour ouver une popin
        // écouter l'événement pour ouvrir la popin appropriée
        // et set le state correspondant pour appeler le render
    }

    closePopin = () => {
        //TODO: Fonction pour refermer une popin
        // et set le state showSportPopin & showCountryPopin à FALSE
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
                                <div className="moreInfo">
                                    <MoreInfo />
                                </div>
                            </div>
                            <div className="sports">
                                <p>{this.props.data.sports.length}</p>
                                <span>Disciplines</span>
                                <div className="moreInfo">
                                    <MoreInfo />
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
                                            labels={this.maxRatio.map(country => country.code)}
                                            dataset={this.maxRatio.map(country => country.ratio)}
                                            type="ratio" 
                                        />
                                    ) : (
                                        <Chart 
                                            labels={this.maxAmount.map(country => country.code)}
                                            dataset={this.maxAmount.map(country => country.female)}
                                            type="amount" 
                                        />
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.showSportPopin && (
                        <div id="sport" className="Dashboard_popup">
                            <div className="Dashboard_popup_container">
                                <span onClick={this.closePopin}>X</span>
                                <div className="Dashboard_popup_container_list">
                                    <h4>Les disciplines<br/>en compétition :</h4>
                                    <ul className={this.props.data.sports.length > 14 ? 'columns' : ''}>
                                        { this.props.data.sports.map((sport, key) => (
                                            <li key={key}>{sport}</li>
                                        )) }
                                    </ul>
                                </div>
                                <div className="Dashboard_popup_graph"></div>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.showCountriesPopin && (
                        <div id="country" className="Dashboard_popup">
                            <div className="Dashboard_popup_container">
                                <span onClick={this.closePopin}>X</span>
                                <div className="Dashboard_popup_container_list">
                                    <h4>Les disciplines<br/>en compétition :</h4>
                                    <ul className={this.props.data.sports.length > 14 ? 'columns' : ''}>
                                        { this.props.data.sports.map((sport, key) => (
                                            <li key={key}>{sport}</li>
                                        )) }
                                    </ul>
                                </div>
                                <div className="Dashboard_popup_graph"></div>
                            </div>
                        </div>
                    )
                }
            </section>
        )
    }
}

export default Dashboard;