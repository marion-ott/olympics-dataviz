import React from 'react'
import './styles.scss'
import MoreInfo from '../MoreInfo/MoreInfo'

class Statistics extends React.Component {
    render() {
        const maxAmount = this.props.data.countries.sort(function(a, b) {
            return parseFloat(b.female) - parseFloat(a.female)
        }).slice(0,1)
        const maxRatio = this.props.data.countries.sort(function(a, b) {
            return parseFloat(b.ratio) - parseFloat(a.ratio)
        }).slice(0,1)

        const malePercentage = Math.round((this.props.data.game[0].male / (this.props.data.game[0].female + this.props.data.game[0].male)) * 100)

        return(
            <section className="Statistics">
                <div className="Statistics_infos">
                    <div className="Statistics_infos_year">
                        <span>Année</span>
                        <h5>{this.props.data.game[0].year}</h5>
                    </div>
                    <div className="Statistics_infos_details">
                        <div className="Statistics_infos_details_location">
                            <div>
                                <span>Pays hôte</span>
                                <p>{this.props.data.game[0].country_name}</p>
                            </div>
                            <div>
                                <span>Ville hôte</span>
                                <p>{this.props.data.game[0].city_name}</p>
                            </div>
                        </div>
                        <div className="Statistics_infos_details_numbers">
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
                <div className="Statistics_athletes">
                    <h4>La parité aux<br/>Jeux Olympiques de {this.props.data.game[0].year}</h4>
                    <div className="div Statistics_athletes_text">
                        <div className="scale">
                            <div className="scale_visual">
                                <div className="total"></div>
                                <div className="male" style={{ height: `${malePercentage}%`}}></div>
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
                                <span>Pays comptant<br/>le plus de femmes atlètes :</span>
                                <p>{maxAmount[0].name} <span className="details">({maxAmount[0].female} femmes)</span></p>
                            </div>
                            <div className="ratio">
                                <span>Pays avec le ratio<br/>de femmes le plus important :</span>
                                <p>{maxRatio[0].name} <span className="details">({Math.round(maxRatio[0].ratio * 100)}% de femmes)</span></p>
                            </div>
                        </div>
                    </div> 
                </div>
            </section>
        )
    }
}

export default Statistics;