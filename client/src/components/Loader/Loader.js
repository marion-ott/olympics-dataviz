import React from 'react'
import './styles.scss'

class Loader extends React.Component {

    constructor(props) {
        super(props)
        this.rings = []
    }

    componentDidMount() {
        let count = 0
        let animateInterval = setInterval(() => {
            if(count === this.rings.length) {
                clearInterval(animateInterval)
            } else {
                this.rings[count].classList.add('path')
                count++
            }
        }, 500)
    }

    render() {
        return(
            <div className="Loader">
                <svg viewBox="0 0 1400 900" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <circle id="circle-1" cx="100" cy="110" r="100"></circle>
                        <circle id="circle-2" cx="220" cy="210" r="100"></circle>
                        <circle id="circle-3" cx="340" cy="110" r="100"></circle>
                        <circle id="circle-4" cx="460" cy="210" r="100"></circle>
                        <circle id="circle-5" cx="580" cy="110" r="100"></circle>
                    </defs>
                    <g id="logo-demo" strokeWidth="25" fill="none" transform="translate(350.000000, 300.000000)">
                        <use ref={el => this.rings.push(el)} xlinkHref="#circle-1" stroke="#117FCD"></use>
                        <use ref={el => this.rings.push(el)} xlinkHref="#circle-2" stroke="#F9A91F"></use>
                        <use ref={el => this.rings.push(el)} xlinkHref="#circle-3" stroke="#231F20"></use>
                        <use ref={el => this.rings.push(el)} xlinkHref="#circle-4" stroke="#00A650"></use>
                        <use ref={el => this.rings.push(el)} xlinkHref="#circle-5" stroke="#EE2049"></use>
                    </g>
                </svg>
            </div>
        )
    }
}

export default Loader