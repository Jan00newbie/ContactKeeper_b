import React from 'react'

const style = {
    display: 'flex'
}

export const Alert = ({messages, type}) => 
    <div className={`alert__box--${type}`} style={style}>
        {[messages].map((message, index) => 
            <p key={index}>{message}</p>)}
    </div>
