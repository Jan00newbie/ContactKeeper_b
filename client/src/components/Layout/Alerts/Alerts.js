import React, {useContext} from 'react'
import { Alert } from './Alert'
import alertContext from '../../../context/alert/alertContext'

const style = {
    display:'flex'
}

export const AlertsList = () => {
    const {alerts} = useContext(alertContext)
    console.log(alerts)
    return (
        <div style={style}>
            {alerts.map(({id, msg, type}) => <Alert key={id} msg={msg} type={type}/>)}
        </div>
    )
}
