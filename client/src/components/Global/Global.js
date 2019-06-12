import React from 'react'
import './styles.scss'
import MoreInfo from '../MoreInfo/MoreInfo'
import Chart from '../Chart/Chart'

class Global extends React.Component {
    render() {
        let womenCount = []

        this.props.data.forEach(el => {
            let womenCountPerGame = 0
            el.countries.forEach(country => womenCountPerGame = womenCountPerGame + country.female)
            womenCount.push(womenCountPerGame)
        })

        return(
            <div className="Global">
                <div className="Global_close">
                    <MoreInfo onClick={this.props.toggleGlobal} />
                </div>
                <div className="Global_chart">
                    <Chart 
                        legend={true}
                        labels={this.props.data.map(el => el.game[0].year)}
                        globalAmount={womenCount}
                        type="amount"
                        fontFamily="Signika"
                        shape="line" 
                        height={500}
                        width={800}
                    />
                </div>
            </div>

        )
    }
}

export default Global