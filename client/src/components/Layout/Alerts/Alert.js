import React from 'react'

const style = {
    display: 'flex'
}

export const Alert = ({msg, type}) => {
    console.log( [msg] );
    
    return (
        <div className={`alert__box--${type}`} style={style}>
            {[msg].map(message=> <p>{message}</p>)}
        </div>
    )
}
