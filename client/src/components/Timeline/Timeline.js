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

        // elementClick.classList.add('active');
        // allDates.forEach((element, index) => {

        // const allItems = Array.from(document.querySelectorAll('a'));
        // allItems.forEach((element, index) => {
        //     if (element.className === 'active') {
        //         element.classList.remove('active');
        //     }
        // })
        //
        // //Récupère l'element click
        // const element = index.target;
        // //Retourne l'index de l'element click
        // const indexElement = parseInt(element.getAttribute('index'));
        //
        // //Selection et affichage des div contenu
        // const divContent = Array.from(document.querySelectorAll('.container div'));
        // divContent.forEach((el, index) => {
        //     if (index === indexElement) {
        //         el.classList.add('activeContent');
        //         element.classList.add('active');
        //
        //     } else {
        //         el.classList.remove('activeContent');
        //     }
        // })

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
