import React from 'react'
// import ReactDOM from 'react-dom'
import './styles.scss'
import scrollToY 		     from '../ScrollToY/ScrollToY';
import getElementOffset  from '../ScrollToY/GetElementOffset';
import Game 		         from '../Game/Game';
// import { TimelineLite, Power2 } from 'gsap'
import { TweenLite, TimelineMax } from 'gsap'
// import { Tween, Timeline } from 'react-gsap';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.title = null
        this.line = null
        this.lineAfter = null
        this.scrollIcon = null
        this.background = null
        // this.tl = new TimelineLite({paused: true})



    }

    componentDidMount() {
      // TweenLite.set('.Home_title', {x:'-120%'})
      // const lines = new TimelineMax({delay:1.5})
      // .from('.one',0,{x:'-20%', opacity: 0})
      // .to('.one', 0.5,{x:'0%', opacity: 1})
      // .from('.two',0,{x:'-20%', opacity: 0})
      // .to('.two', 0.5,{x:'0%', opacity: 1, delay: 0.1})
      // .from('.date',0.6,{ opacity: 0})
      // .to('.date', 1,{ opacity: 1})
      // .from('.scroller',0.6,{ opacity: 0})
      // .to('.scroller', 1,{ opacity: 1})
      TweenLite.to('.one',0.5,{x:'20', opacity: 1, delay:2})
      TweenLite.to('.two',0.5,{x:'20', opacity: 1, delay:2.5})
      TweenLite.to('.date',0.5,{opacity: 1, delay:3})
      TweenLite.to('.scroller',0.5,{opacity: 1, delay:3.5})
    }


    scrollTo = () => {
      const button = document.querySelector('.mouse');
      const scrollTo = document.querySelector('.Game');
      const offsetNextSibling = getElementOffset(scrollTo).top;
      scrollToY(offsetNextSibling);
    }


    render() {
        return(

            <div className="Home">
                <div className="Home_logo">
                    <a href="#map">
                        <img src={`${process.env.PUBLIC_URL}assets/img/rings-olympics.png`} alt=""/>
                    </a>
                </div>
                {/* <div className="Home_loader">
                    <div ref={el => this.line = el} className="Home_loader_line"></div>
                    <div ref={el => this.lineAfter = el} className="Home_loader_lineAfter"></div>
                </div> */}
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
