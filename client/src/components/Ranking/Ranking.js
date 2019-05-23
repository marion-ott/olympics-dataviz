import React from 'react'
import './styles.scss'

class Ranking extends React.Component {
    render() {
        return(
            <section className="Ranking">
                <table className="Ranking_table">
                    <thead>
                        <tr>
                            <th className="Ranking_table_column_country">Pays</th>
                            <th>Or</th>
                            <th>Argent</th>
                            <th>Bronze</th>
                            <th>total</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.ranks.map((rank, key) => (
                                <tr key={key}>
                                    <td className="Ranking_table_column_country">{rank.name}</td>
                                    <td>{rank.gold}</td>
                                    <td>{rank.silver}</td>
                                    <td>{rank.bronze}</td>
                                    <td>{rank.total}</td>
                                </tr>
                        )) }
                    </tbody>
                </table>
            </section>
        )
    }
}

export default Ranking