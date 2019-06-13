import React from 'react'
import { Bar, HorizontalBar, Doughnut, Line } from 'react-chartjs-2'

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.chartData = null
    }

    componentWillMount() {
        this.updateData()
    }

    updateData = () => {
        if(this.props.shape !== 'line') {
            this.chartData = {
                labels: this.props.labels,
                datasets : [
                    {
                        label: '',
                        data: this.props.dataset,
                        backgroundColor: this.props.shape === 'doughnut' ? [this.props.color, 'rgba(255,255,255,0.2)'] : '#f2b632',
                        borderWidth: 0,
                    }
                ]
            }
        } else {
            this.chartData = {
                labels: this.props.labels,
                datasets: [{
                    label: "Moyenne globale",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "#f2b632",
                    borderColor: "#f2b632",
                    borderCapStyle: 'square',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "black",
                    pointBackgroundColor: "white",
                    // pointBorderWidth: 1,
                    // pointHoverRadius: 8,
                    // pointHoverBackgroundColor: "yellow",
                    // pointHoverBorderColor: "brown",
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 10,
                    data: this.props.globalWomen,
                    spanGaps: true,
                  }, {
                    label: "Stock B",
                    lineTension: 0.1,
                    pointBorderColor: "white",
                    pointBackgroundColor: "yellow",
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: "brown",
                    pointHoverBorderColor: "yellow",
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    pointHitRadius: 10,
                    data: [10, 20, 60, 95, 64, 78, 90,2,70,40,70,89],
                    spanGaps: false,
                  }
                ]
            }
        }
    }

    renderChart = (shape) => {
        switch(shape) {
            case 'bar':
                return(
                    <Bar 
                        data={this.chartData}
                        width={520}
                        height={220}
                        options={{
                            title: {
                                display: this.props.title,
                                text: this.props.titleText,
                                fontFamily: this.props.titleFontFamily,
                                fontColor: this.props.titleFontColor,
                                fontSize: 18,
                                fontStyle: 'normal'
                            },
                            maintainAspectRatio: false,
                            legend: {
                                display: this.props.legend,
                                fontFamily: this.props.fontFamily,
                                text: this.props.legendText
                            },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            fontSize: 16,
                                            fontColor: '#FFF'
                                        },
                                        gridLines: {
                                            display: false,
                                            drawBorder: false,
                                            scaleLineColor: 'transparent',
                                            drawOnChartArea: false,
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        ticks: {
                                            display: false,
                                            fontSize: 10,
                                            fontColor: '#FFF'
                                        },
                                        gridLines: {
                                            display: false,
                                            drawBorder: false,
                                            scaleLineColor: 'transparent',
                                            drawOnChartArea: false,
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                )
            case 'horizontal':
                return(
                    <HorizontalBar 
                        data={this.chartData}
                        width={this.props.width}
                        height={this.props.height}
                        options={{
                            title: {
                                display: this.props.title,
                                text: this.props.titleText,
                                fontFamily: this.props.titleFontFamily,
                                fontColor: this.props.titleFontColor,
                                fontSize: 18,
                                fontStyle: 'normal'
                            },
                            maintainAspectRatio: false,
                            legend: {
                                display: this.props.legend,
                                fontFamily: this.props.fontFamily,
                                text: this.props.legendText
                            },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            fontSize: 16,
                                            fontColor: '#FFF'
                                        },
                                        gridLines: {
                                            display: false,
                                            drawBorder: false,
                                            scaleLineColor: 'transparent',
                                            drawOnChartArea: false,
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        ticks: {
                                            display: false,
                                            fontSize: 10,
                                            fontColor: '#FFF'
                                        },
                                        gridLines: {
                                            display: false,
                                            drawBorder: false,
                                            scaleLineColor: 'transparent',
                                            drawOnChartArea: false,
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                )
            case 'doughnut':
                return(
                    <Doughnut 
                        data={this.chartData}
                        // width={520}
                        // height={220}
                        options={{
                            cutoutPercentage: 85,
                            tooltips: {
                                enabled: false
                            },
                            title: {
                                display: this.props.title,
                                text: this.props.titleText,
                                fontFamily: this.props.titleFontFamily,
                                fontColor: this.props.titleFontColor,
                                fontSize: 18,
                                fontStyle: 'normal'
                            },
                            maintainAspectRatio: false,
                            legend: {
                                display: this.props.legend,
                                fontFamily: this.props.fontFamily,
                                text: this.props.legendText
                            },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            display: false,
                                            fontSize: 16,
                                            fontColor: '#FFF'
                                        },
                                        gridLines: {
                                            display: false,
                                            drawBorder: false,
                                            scaleLineColor: 'transparent',
                                            drawOnChartArea: false,
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        ticks: {
                                            display: false,
                                            fontSize: 10,
                                            fontColor: '#FFF'
                                        },
                                        gridLines: {
                                            display: false,
                                            drawBorder: false,
                                            scaleLineColor: 'transparent',
                                            drawOnChartArea: false,
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                )
            case 'line':
                    return(
                        <Line 
                            data={this.chartData}
                            width={this.props.width}
                            height={this.props.height}
                            options={{
                                title: {
                                    display: this.props.title,
                                    text: this.props.titleText,
                                    fontFamily: this.props.titleFontFamily,
                                    fontColor: this.props.titleFontColor,
                                    fontSize: 18,
                                    fontStyle: 'normal'
                                },
                                maintainAspectRatio: false,
                                legend: {
                                    display: this.props.legend,
                                    fontFamily: this.props.fontFamily,
                                    text: this.props.legendText
                                },
                                scales: {
                                    yAxes: [
                                        {
                                            display: false,
                                            ticks: {
                                                fontSize: 16,
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
                    )
            default:
                break;
        }
    }
    
    render() {
        this.updateData()

        return(
            <div className="Chart" style={{ marginTop: '30px'}}>
                {
                    this.renderChart(this.props.shape)
                }
            </div>
        )
    }
}

export default Chart