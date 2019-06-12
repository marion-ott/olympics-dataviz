import React from 'react'
// import ReactDOM from 'react-dom'
import './styles.scss'
// import { TimelineLite, Power2 } from 'gsap'
import ReactVivus from 'react-vivus'
import svg from './loader.svg'


const Loader = () =>  (
    <div className="Loader hidden">
        <div className="background">
            <div className="Home_background back" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/background-back.png)` }}></div>
            <div className="Home_background front" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/background-front.png)` }}></div>
        </div>
        <div className="loaderAnim">
            <ReactVivus
                id="logoAnimated"
                option={{
                    file: svg,
                    start: 'autostart',
                    duration: 200,
                    animTimingFunction: 'EASE',
                    type: 'oneByOne',
                    onReady: console.log
                }}

                callback={console.log}
            />
        </div>
    </div>
)

export default Loader
