import React from 'react'
// import ReactDOM from 'react-dom'
import './styles.scss'
// import { TimelineLite, Power2 } from 'gsap'


const Loader = () =>  (
    <div className="Loader">
        <h1> Loader </h1>
    </div>
)

// class Loader extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.title = null
    //     this.line = null
    //     this.lineAfter = null
    //     this.scrollIcon = null
    //     this.background = null
    //     // this.tl = new TimelineLite({paused: true})
    // }
    //
    // componentDidMount() {
    //     // this.tl.to(this.line, 1, {ease: Power2.easeOut, width: '100%', delay: 1})
    //     //        .to(this.lineAfter, 0, {display: 'block'})
    //     //        .to(this.line, 0, {display: 'none'})
    //     //        .to(this.lineAfter, 1, {ease: Power2.easeOut, width: '0%', delay: 1})
    //     //        .to(this.background, 2, {ease: Power2.easeOut, opacity: '1'})
    //     // this.tl.play()
    //     window.addEventListener("load", function() {
    //         const loader = document.querySelector(".Loader");
    //         Loader.className += "hidden";
    //     });
    // }


    // render() {
    //     return(
    //         <div className="Loader">
    //             <div className="Loader_logo">
    //                 <h1>Loader</h1>
    //             </div>
    //             {/* <div className="Loader_loader">
    //                 <div ref={el => this.line = el} className="Loader_loader_line"></div>
    //                 <div ref={el => this.lineAfter = el} className="Loader_loader_lineAfter"></div>
    //             </div>
    //             <div ref={el => this.background = el}>
    //                 <div className="Loader_background back" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/background-back.png)` }}></div>
    //                 <div className="Loader_background front" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/background-front.png)` }}></div>
    //             </div>
    //             <div className="Loader_backgroundOverlay"></div>
    //             <div className="Loader_title">
    //                 <h1 ref={el => this.title = el}>Les jeux<br/>Olympiques</h1>
    //                 <div className="date">
    //                     <div></div>
    //                     <h3>1896 - 2016</h3>
    //                 </div>
    //             </div>
    //             <div ref={el => this.scrollIcon = el} className="scroller">
    //                 <div className="mouse">
    //                     <div className="ball"></div>
    //                 </div>
    //             </div>*/}
    //         </div>
    //     )
    // }
// }

export default Loader
