import React from 'react'

const style = {
    display: 'flex'
}

export const Alert = ({msg, type}) => 
    <div className={`alert__box--${type}`} style={style}>
        {[msg].map((message, index) => 
            <p key={index}>{message}</p>)}
    </div>
