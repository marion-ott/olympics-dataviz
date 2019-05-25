import React from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'
import Loader from '../Loader/Loader'
import { TimelineLite } from 'gsap'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.title = null
        this.scrollMessage = null
        this.scrollIcon = null
        this.tl = new TimelineLite({paused: true})
    }

    componentDidMount() {
        this.tl.to(ReactDOM.findDOMNode(this.loader), 1, {y: -150, opacity: .6, delay: 5})
               .to(this.title, 1, {y: -50, opacity: 1},6)
        this.tl.play()
    }

    render() {
        return(
            <div className="Home">
                <div className="Home--overlay"></div>
                <Loader ref={el => this.loader = el} />
                <div className="Home--rings" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/olympics-rings.png)` }}></div>
                <h1 ref={el => this.title = el} className="Home_title">Inside the Olympics<br/><span className="date">(1896 - 2016)</span></h1>
                <div className="indicator">
                    <p ref={el => this.scrollMessage = el}>Scroll</p>
                    <div ref={el => this.scrollIcon = el} className="container">
                        <div className="line"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home