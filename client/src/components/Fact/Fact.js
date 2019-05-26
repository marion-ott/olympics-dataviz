import React from 'react'
import './styles.scss'


class Fact extends React.Component {
    render() {
        return(
            <div className="Fact">
                <p className="Fact_sectionTitle">Histoire</p>
                <div className="Fact_container">
                    <h3>L'athlète américain Jesse Owens remporte 4 médailles d'or aux Jeux olympiques de 1936, organisés par l'Allemagne nazie.</h3> 
                    <div className="Fact_background" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}assets/img/fait-1.jpg)` }}></div>
                    <div className="Fact_paragraph">
                        <p>
                            Les médaillés du saut en longueur saluent depuis le podium aux Jeux olympiques d'été de Berlin, le 8 août 1936. De gauche à droite : le japonais Naoto Tajima (bronze) ; l’américain Jesse Owens (or) qui a établi un record olympique lors de l’événement et salué à la manière américaine avec la main sur le front ; et l’allemand Luz Long (argent) faisant le salut nazi.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Fact