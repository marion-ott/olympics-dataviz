import React from 'react'
import './styles.scss'

export default ({type, onClick, id}) => (
    <div id={id} onClick={onClick} className={`MoreInfo ${type}`}>
        <div className="vertical"></div>
        <div className="horizontal"></div>
    </div>
)