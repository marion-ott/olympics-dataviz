import React from 'react'
import './styles.scss'
import MoreInfo from '../MoreInfo/MoreInfo'
import { Line, Bar } from 'react-chartjs-2'
import Chart from '../Chart/Chart'

class Global extends React.Component {
    
    componentWillMount() {
        this.sortData()
        this.womenCountData = null
    }
    
    sortData = () => {

        let mostParticipation = [
            {
                name: "Italie",
                amount: 28,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Suisse",
                amount: 28,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "France",
                amount: 28,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Royaume-Uni",
                amount: 28,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Australie",
                amount: 28,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Grèce",
                amount: 28,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Danemark",
                amount: 27,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Suède",
                amount: 27,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "États-Unis",
                amount: 27,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Autriche",
                amount: 27,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Belgique",
                amount: 26,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Pays-Bas",
                amount: 26,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Canada",
                amount: 26,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Norvège",
                amount: 26,
                gold: 0,
                silver: 0,
                bronze: 0
            },
            {
                name: "Hongrie",
                amount: 26,
                gold: 0,
                silver: 0,
                bronze: 0
            }
        ]

        let womenCount = []
        let menCount = []

        const years = this.props.data.map(el => el.game[0].year)
    
        this.props.data.forEach(el => {
            let womenCountPerGame = 0
            let menCountPerGame = 0
            el.countries.forEach(country => {
                womenCountPerGame = womenCountPerGame + country.female
                menCountPerGame = menCountPerGame + country.male
            })
            womenCount.push(Math.round(womenCountPerGame / el.countries.length))
            menCount.push(Math.round(menCountPerGame / el.countries.length))
        })

        mostParticipation.forEach(participant => {
            this.props.data.forEach(el => {
                el.countries.forEach(country => {
                    if(country.name === participant.name) {
                        participant.gold = participant.gold + country.medals.gold
                        participant.silver = participant.silver + country.medals.silver
                        participant.bronze = participant.bronze + country.medals.bronze
                    }
                })
            })
        })

        let mostParticipationSorted = mostParticipation.sort((a, b) => (b.amount - a.amount || b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze))

        this.setState({
            globalWomen: womenCount,
            globalMen: menCount,
            years: years
        })

        this.womenChart = {
            labels: years,
            datasets: [
                {
                    label: "Moyenne de femmes par équipe",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#f2b632",
                    borderColor: "#f2b632",
                    borderCapStyle: 'square',
                    borderDash: [],
                    borderWidth: 1,
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointRadius: 1,
                    // pointBorderColor: "black",
                    pointBackgroundColor: "#f2b632",
                    //pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: womenCount,
                    spanGaps: true,
                }, {
                    label: "Moyenne d'hommes par équipe",
                    fill: false,
                    backgroundColor: '#F06543',
                    borderColor: '#F06543',
                    lineTension: 0.1,
                    // pointBorderColor: "white",
                    pointBackgroundColor: "#F06543",
                    borderWidth: 1,
                    pointRadius: 3,
                    // pointHitRadius: 10,
                    data: menCount,
                    spanGaps: false,
                }
            ]
        }

        let countries = mostParticipationSorted.map(el => el.name)
        let countriesPart = mostParticipationSorted.map(el => el.amount)
        let countriesGold = mostParticipationSorted.map(el => el.gold)
        let countriesSilver = mostParticipationSorted.map(el => el.silver)
        let countriesBronze = mostParticipationSorted.map(el => el.bronze)

        this.countriesChart = {
            labels: countries,
            datasets: [
                {
                    label: "Participations",
                    fill: false,
                    backgroundColor: '#F06543',
                    borderColor: '#F06543',
                    lineTension: 0.1,
                    // pointBorderColor: "white",
                    pointBackgroundColor: "#F06543",
                    borderWidth: 1,
                    pointRadius: 3,
                    // pointHitRadius: 10,
                    data: countriesPart,
                    spanGaps: false,
                },
                {
                    stack: 'medals',
                    label: "Médailles d'or",
                    fill: false,
                    backgroundColor: '#e5c100',
                    borderColor: '#e5c100',
                    lineTension: 0.1,
                    // pointBorderColor: "white",
                    pointBackgroundColor: "#e5c100",
                    borderWidth: 1,
                    pointRadius: 3,
                    // pointHitRadius: 10,
                    data: countriesGold,
                    spanGaps: false,
                }, {
                    stack: 'medals',
                    label: "Médailles d'argent",
                    fill: false,
                    backgroundColor: '#c0c0c0',
                    borderColor: '#c0c0c0',
                    lineTension: 0.1,
                    // pointBorderColor: "white",
                    pointBackgroundColor: "#c0c0c0",
                    borderWidth: 1,
                    pointRadius: 3,
                    // pointHitRadius: 10,
                    data: countriesSilver,
                    spanGaps: false,
                }, {
                    stack: 'medals',
                    label: "Médailles de bronze",
                    fill: false,
                    backgroundColor: '#614e1a',
                    borderColor: '#614e1a',
                    lineTension: 0.1,
                    // pointBorderColor: "white",
                    pointBackgroundColor: "#614e1a",
                    borderWidth: 1,
                    pointRadius: 3,
                    // pointHitRadius: 10,
                    data: countriesBronze,
                    spanGaps: false,
                }
            ]
        }
    }

    render() {

        return(
            this.state && (
                <div className="Global">
                    <p className="Ranking_sectionTitle">Global</p>
                    <div className="Global_close">
                        <MoreInfo onClick={this.props.toggleGlobal} type="close" />
                    </div>
                    <div className="Global_chart">
                        <h4>Nombre de femmes et d'hommes moyen par équipe</h4>
                        <Line 
                            data={this.womenChart}
                            width={600}
                            height={250}
                            options={{
                                // title: {
                                //     display: this.props.title,
                                //     text: this.props.titleText,
                                //     fontFamily: this.props.titleFontFamily,
                                //     fontColor: this.props.titleFontColor,
                                //     fontSize: 18,
                                //     fontStyle: 'normal'
                                // },
                                // maintainAspectRatio: false,
                                legend: {
                                    display: false,
                                    fontFamily: this.props.fontFamily,
                                    text: this.props.legendText
                                },
                                scales: {
                                    yAxes: [
                                        {
                                            //display: false,
                                            ticks: {
                                                fontSize: 12,
                                                fontFamily: 'Signika',
                                                fontColor: '#FFF'
                                            },
                                            gridLines: {
                                                drawOnChartArea: false,
                                            }
                                        }
                                    ],
                                    xAxes: [
                                        {
                                            ticks: {
                                                fontSize: 10,
                                                fontFamily: 'Signika',
                                                fontColor: '#FFF'
                                            },
                                            gridLines: {
                                                drawOnChartArea: false,
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                        <div className="legend">
                            <div className="legend_item">
                                <div className="bullet yellow"></div>
                                <p>Moyenne de femmes par équipe</p>
                            </div>
                            <div className="legend_item">
                                <div className="bullet red"></div>
                                <p>Moyenne d'hommes par équipe</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                    <div className="Global_chart">
                        <h4>Nombre de médailles des pays comptant le plus de participations</h4>
                        <Bar 
                            data={this.countriesChart}
                            height={250}
                            width={600}
                            options={{
                                // title: {
                                //     display: this.props.title,
                                //     text: this.props.titleText,
                                //     fontFamily: this.props.titleFontFamily,
                                //     fontColor: this.props.titleFontColor,
                                //     fontSize: 18,
                                //     fontStyle: 'normal'
                                // },
                                // maintainAspectRatio: false,
                                legend: {
                                    display: false,
                                    fontFamily: this.props.fontFamily,
                                    text: this.props.legendText
                                },
                                scales: {
                                    yAxes: [
                                        {
                                            //display: false,
                                            ticks: {
                                                fontSize: 12,
                                                fontFamily: 'Signika',
                                                fontColor: '#FFF'
                                            },
                                            gridLines: {
                                                drawOnChartArea: false,
                                            }
                                        }
                                    ],
                                    xAxes: [
                                        {
                                            ticks: {
                                                fontSize: 10,
                                                fontFamily: 'Signika',
                                                fontColor: '#FFF'
                                            },
                                            gridLines: {
                                                drawOnChartArea: false,
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                        <div className="legend">
                            <div className="legend_item">
                                <div className="bullet gold"></div>
                                <p>Médailles d'or</p>
                            </div>
                            <div className="legend_item">
                                <div className="bullet silver"></div>
                                <p>Médailles d'argent</p>
                            </div>
                            <div className="legend_item">
                                <div className="bullet bronze"></div>
                                <p>Médailles de bronze</p>
                            </div>
                            <div className="legend_item">
                                <div className="bullet red"></div>
                                <p>Nombre de participations</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            )

        )
    }
}

export default Global


