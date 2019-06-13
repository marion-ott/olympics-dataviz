import React from 'react'
import './styles.scss'


class Fact extends React.Component {
    render() {

        return(
            <div className="Fact">
                <p className="Fact_sectionTitle">Histoire</p>
                <div className="Fact_container">
                    <div className="Fact_background" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}${this.props.fact.src})` }}></div>
                    <div className="Fact_paragraph">
                        <h3>{this.props.fact.title}</h3>
                        <p>
                            {this.props.fact.text}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Fact
