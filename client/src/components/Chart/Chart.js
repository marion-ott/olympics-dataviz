import React from 'react'
import { Bar } from 'react-chartjs-2'

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
                            maintainAspectRatio: false,
                            legend: {
                                display: false
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