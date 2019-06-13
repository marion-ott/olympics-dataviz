import React from 'react'
// import ReactDOM from 'react-dom'
import './styles.scss'
import MoreInfo from '../MoreInfo/MoreInfo'
import Popin from '../Popin/Popin'
import Chart from '../Chart/Chart'
import AOS from 'aos'


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

    componentWillReceiveProps (){ 
        AOS.refresh(); 
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
                {
                    this.state.showSportsPopin && (
                        <Popin data={this.props.data} id="sport" closePopin={this.closePopin} />
                    )
                }
                <div className="Dashboard_infos">
                    <div className="Dashboard_infos_year">
                        <span data-aos="fade-zoom-in">Année</span>
                        <h5 data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="500">{this.props.data.game[0].year}</h5>
                    </div>
                    <div className="Dashboard_infos_details">
                        <div data-aos="slide-right"  className="Dashboard_infos_details_location" >
                            <div >
                                <span>Pays hôte</span>
                                <p>{this.props.data.game[0].country_name}</p>
                            </div>
                            <div data-aos-easing="ease-in-out" data-aos-duration="400" data-aos="fade-zoom-in" >
                                <span>Ville hôte</span>
                                <p>{this.props.data.game[0].city_name}</p>
                            </div>
                        </div>
                        <div className="Dashboard_infos_details_numbers">
                            <div data-aos="slide-up" data-aos-offset="-50" data-aos-easing="ease-in-out" data-aos-duration="500" className="nations">
                                <p>{this.props.data.countries.length}</p>
                                <span>Pays participants</span>
                            </div>
                            <div data-aos="slide-up" data-aos-offset="-50" data-aos-easing="ease-in-out" data-aos-duration="400" data-aos-delay="200" className="sports">
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
                    <div data-aos="fade-in" data-aos-easing="ease-in-out" data-aos-duration="500" className="top">
                        <h4>La parité aux<br/>Jeux Olympiques de {this.props.data.game[0].year}</h4>
                        <div className="Dashboard_athletes_text">
                            <div className={`scale ${this.props.data.game[0].year === 1896 && 'firstGame'}`}>
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
                            {
                                this.props.data.game[0].year === 1896 ? null : (
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
                                )
                            }
                        </div> 
                    </div>
                    {
                        this.props.data.game[0].year === 1896 ? (
                            <div data-aos="fade-in" data-aos-easing="ease-in-out" data-aos-duration="500" className="bottom womenLess">
                                <p>Il s'agit de la seule édition durant laquelle absolument <strong>aucune femme athlète n'a concuru.</strong></p>
                            </div>
                        ) : (
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
                        )
                    }
                </div>
            </section>
        )
    }
}

export default Dashboard;