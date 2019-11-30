import React from 'react'

export const Alert = ({messages, type}) => 
    <div className={`btn alert__box--${type}`}>
        {messages.map((message, index) => 
            <p key={index}>{message}</p>)}
    </div>
