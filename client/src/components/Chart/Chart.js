import React from 'react'
import { Bar, HorizontalBar } from 'react-chartjs-2'

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
        this.chartData = {
            labels: this.props.labels,
            datasets : [
                {
                    label: '',
                    data: this.props.dataset,
                    backgroundColor: '#f2b632',
                    borderWidth: 1,
                }
            ]
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
                                text: this.props.legendText
                            },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            fontSize: 16,
                                            fontColor: '#FFF'
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        ticks: {
                                            fontSize: 10,
                                            fontColor: '#FFF'
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                )
                break;
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
                                text: this.props.legendText
                            },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            fontSize: 16,
                                            fontColor: '#FFF'
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        ticks: {
                                            fontSize: 10,
                                            fontColor: '#FFF'
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                )
                break;
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