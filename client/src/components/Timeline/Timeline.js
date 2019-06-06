import React from 'react'
import './styles.scss'

class Timeline extends React.Component {

    addClass = (index) => {

        const allDates = Array.from(document.querySelectorAll('.Timeline ul li'));
        const elementClick = index.target;

        allDates.forEach((element, index) => {
            if (element  === elementClick) {
                element.classList.add('active');
            }
            else {
                element.classList.remove('active');
            }
        })
    }

    render() {
        return(
            <section className="Timeline">
                <ul>
                    {
                        this.props.games.map((game, key) => (
                            <li key={key} id={game.id} onClick={(event) => {this.props.updateGame(event); this.addClass(event)}}>{game.year}</li>
                        ))
                    }
                </ul>
            </section>
        )
    }
}

export default Timeline
