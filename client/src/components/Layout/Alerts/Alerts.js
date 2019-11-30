import React, {useContext} from 'react'
import { Alert } from './Alert'
import alertContext from '../../../context/alert/alertContext'

const style = {
    display:'flex',
    flexDirection: 'column'
}

export const AlertsList = () => {
    const {alerts} = useContext(alertContext)
    console.log(alerts);
    
    return (
        <div style={style}>
            {alerts.map(({id, ...data}) => 
                <Alert key={id} {...data}/>)}
        </div>
    )
}
