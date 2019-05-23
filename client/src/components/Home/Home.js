import React from 'react'
import './styles.scss'

class Home extends React.Component {
    render() {
        return(
            <div className="Home" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/home2.jpg)` }}>
                <div className="Home--overlay"></div>
                <div className="Home--rings" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/olympics-rings.png)` }}></div>
                <h1 className="Home_title">Olympics<br/> Story</h1>
            </div>
        )
    }
}

export default Home