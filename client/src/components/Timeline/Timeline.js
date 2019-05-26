import React from 'react'
import './styles.scss'

class Timeline extends React.Component {
    render() {
        return(
            <section className="Timeline">
                <ul>
                    {
                        this.props.games.map((game, key) => (
                            <li key={key} id={game.id} onClick={(event) => this.props.updateGame(event)}>{game.year}</li>
                        ))
                    }
                </ul>
            </section>
        )
    }
}

export default Timeline