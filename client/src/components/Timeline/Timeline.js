import React from 'react'
import './styles.scss'

class Timeline extends React.Component {
    handleHover = (event) => {
        let eventType = event.type

        switch(eventType) {
            case 'mouseenter':
                event.target.classList.add('active')
                break;
            case 'mouseleave':
                if(this.isClicked) {
                    return false
                } else {
                    event.target.classList.remove('active')
                }
                break;
            default:
                break;
        }
    }
    render() {
        return(
            <section className="Timeline">
                <div className="Timeline_container">
                    {
                        this.props.games.map((game, key) => (
                            <div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} key={key} className={`Timeline_item ${key === 0 ? 'clicked first' : key === 27 ? 'last' : ''}`} data-index={game.id} onClick={(event) => this.props.updateGame(event)}>
                                <div></div>
                                <span>{game.year}</span>
                            </div>
                        ))
                    }
                    <div onClick={this.props.toggleGlobal} className="Timeline_global">
                        <p>ALL TIME</p>
                    </div>
                </div>
            </section>
        )
    }
}

export default Timeline
