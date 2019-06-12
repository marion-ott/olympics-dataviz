import React from 'react'
import './styles.scss'
import scrollToY from '../ScrollToY/ScrollToY'
import getElementOffset  from '../ScrollToY/GetElementOffset'
import { TweenLite, Power2 } from 'gsap'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.title = null
        this.line = null
        this.lineAfter = null
        this.scrollIcon = null
        this.background = null
    }

    componentDidMount() {
      TweenLite.to('.one',1.2,{ease: Power2.easeOut, x:'30', opacity: 1, delay:0.5})
      TweenLite.to('.two',1,{ease: Power2.easeOut, x:'30', opacity: 1, delay:0.7})
      TweenLite.to('.date',1,{ease: Power2.easeOut, opacity: 1, delay: 2})
      TweenLite.to('.scroller',1.5,{ease: Power2.easeOut, opacity: 1, delay: 2.5})
    }


    scrollTo = () => {
      const scrollTo = document.querySelector('.Game');
      const offsetNextSibling = getElementOffset(scrollTo).top;
      scrollToY(offsetNextSibling);
    }

    render() {
        return(

            <div className="Home">
                <div className="Home_logo">
                    <a onClick={this.props.scrollTo} href="/">
                        <img src={`${process.env.PUBLIC_URL}assets/img/rings-olympics.png`} alt=""/>
                        <span>Voir la carte</span>
                    </a>
                </div>
                <div ref={el => this.background = el}>
                    <div className="Home_background back" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/background-back.png)` }}></div>
                    <div className="Home_background front" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/background-front.png)` }}></div>
                </div>
                <div className="Home_backgroundOverlay"></div>
                <div className="Home_title">
                    <h1 className="title one" ref={el => this.title = el}>Les jeux</h1>
                    <h1 className="title two" ref={el => this.title = el}>Olympiques</h1>
                    <div className="date">
                        <div></div>
                        <h3>1896 - 2016</h3>
                    </div>
                </div>
                <div ref={el => this.scrollIcon = el} className="scroller" onClick={this.scrollTo}>
                    <div className="mouse">
                        <div className="ball"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
