import React from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'
import Loader from '../Loader/Loader'
import { TimelineLite } from 'gsap'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.title = null
        this.scrollIcon = null
        this.tl = new TimelineLite({paused: true})
    }

    componentDidMount() {
        this.tl.to(ReactDOM.findDOMNode(this.loader), 1, { opacity:0.6, delay: 3})
               .to(this.title, 1, {y: -50, opacity: 1},3.5)
               .to(this.scrollIcon, 1, {y: -10, opacity: 1, delay: 1})
        this.tl.play()
    }

    render() {
        return(
            <div className="Home">
                <div className="Home--overlay"></div>
                <Loader ref={el => this.loader = el} />
                <div className="Home--rings" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/olympics-rings.png)` }}></div>
                <h1 ref={el => this.title = el} className="Home_title">Inside the Olympics<br/><span className="date">(1896 - 2016)</span></h1>
                <div ref={el => this.scrollIcon = el} className="scroller">
                    <div className="mouse">
                        <div className="ball"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home