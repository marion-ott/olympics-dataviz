import React from 'react'
import './styles.scss'

export default ({onClick}) => (
    <div onClick={onClick} className="MoreInfo">
        <div className="vertical"></div>
        <div className="horizontal"></div>
    </div>
)