import React from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'
import Chart from '../Chart/Chart'
import { TweenLite, Power2 } from 'gsap'

class Popin extends React.Component {


    componentWillMount() {
        this.setData()
    }
    
    componentDidMount() {
        this.animateIn()
    }
    
    componentWillReceiveProps() {
        this.setData()
        this.animateIn()
    }

    animateIn = () => {
        TweenLite.to(this.overlay, .3, {ease: Power2.easeInOut, opacity: 1})
        TweenLite.to(this.container, .6, {ease: Power2.easeInOut, width: '100%'},0)
        TweenLite.to(this.content, .6, {ease: Power2.easeInOut, marginLeft: '0px'}, 0)
    }
    
    componentWillUnmount() {
        
    }

    handleClick = (event) => {
        if(event.target.className.includes('popinClose')) {
            TweenLite.to(this.overlay, .3, {ease: Power2.easeInOut, opacity: 0})
            TweenLite.to(this.container, .6, {ease: Power2.easeInOut, width: '0%'})
            TweenLite.to(this.content, .6, {ease: Power2.easeInOut, marginLeft: '-1000px'})
            setTimeout(() => {
                this.props.closePopin()
            }, 1500)
        }
    }

    setData = () => {
        const eventCount = []
        //TODO: Create animation for popin appearing
        this.props.data.sports.forEach(sport => {
            let count = 0
            this.props.data.countries.forEach(country => {
                country.results.forEach(result => {
                    if(parseFloat(result.sportId) === parseFloat(sport.id)) {
                        count++
                    }
                })
            })
            eventCount.push(count)
        })

        const sportData = []
        this.props.data.sports.forEach((sport, key) => {
            let sportItem = {
                sport: sport.sport_name,
                event: eventCount[key]
            }
            sportData.push(sportItem)
        })

        sportData.sort(function(a, b) {
            return parseFloat(b.event) - parseFloat(a.event)
        }).slice(0,10)

        this.setState({
            data: sportData
        })
    }

    render() {

        return(
            <div ref={el => this.container = el}  onClick={this.handleClick} id={this.props.id} className="Popin popinClose">
                <div ref={el => this.overlay = el} className="Popin--overlay popinClose" onClick={this.handleClick}></div>
                <div ref={el => this.content = el} className="Popin_container">
                    <span className="popinClose" onClick={this.props.closePopin}>X</span>
                    <div className="Popin_container_list">
                        <h4>Les disciplines<br/>en compétition :</h4>
                        <ul className={this.props.data.sports.length > 14 ? 'columns' : ''}>
                            { this.props.data.sports.map((sport, key) => {
                                return(
                                    <li key={key}>{sport.sport_name}</li>
                                )
                            }) }
                        </ul>
                    </div>
                    <div className="Popin_graph">
                        <Chart 
                            legend={false}
                            title={true}
                            titleText="Nombre d'épreuves par discpline"
                            titleFontFamily="Anton"
                            titleFontColor="#e6e6e8"
                            labels={this.state.data.map(item => item.sport)}
                            dataset={this.state.data.map(item => item.event)}
                            type="ratio"
                            shape="bar" 
                            height={500}
                            width={30 * this.state.data.length}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Popin