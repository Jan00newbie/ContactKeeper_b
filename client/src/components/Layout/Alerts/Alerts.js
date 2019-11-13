import React, {useContext} from 'react'
import { Alert } from './Alert'
import alertContext from '../../../context/alert/alertContext'

const style = {
    display:'flex'
}

export const AlertsList = () => {
    const {alerts} = useContext(alertContext)

    return (
        <div style={style}>
            {alerts.map(({id, ...data}) => 
                <Alert key={id} {...data}/>)}
        </div>
    )
}
