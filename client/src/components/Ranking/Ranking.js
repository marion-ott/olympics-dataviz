import React from 'react'
import './styles.scss'

class Ranking extends React.Component {
    render() {
        return(
            <section className="Ranking">
                <p className="Ranking_sectionTitle">Classement</p>
                <div className="Ranking_table">
                    <h3>Tableau des médailles</h3>
                    <div className="Ranking_table_rows">
                        <div className="Ranking_table_rows_legend">
                            <div className="name">
                                <p>Pays</p>
                            </div>
                            <div className="medals">
                                <p className="gold">Or</p>
                                <p className="silver">Argent</p>
                                <p className="bronze">Bronze</p>
                                <p>Total</p>
                            </div>
                        </div>
                        { this.props.ranks.map((rank, key) => (
                            <div className="Ranking_table_rows_item" key={key}>
                                <div className="name">
                                    <p>
                                        <span className="rank">{key + 1}</span> 
                                        <img src={rank.flag} alt=""/>
                                        {rank.name}
                                    </p>
                                </div>
                                <div className="medals">
                                    <p className="gold">{rank.gold}</p>
                                    <p className="silver">{rank.silver}</p>
                                    <p className="bronze">{rank.bronze}</p>
                                    <p>{rank.total}</p>
                                </div>
                            </div>
                        )) }
                    </div>
                </div>
            </section>
        )
    }
}

export default Ranking