import React, {useReducer} from 'react';

import AlertContext from "./alertContext";
import alertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'


const AlertState = props => {

    const initialState = [];

    const [state, dispath] = useReducer(alertReducer, initialState);
    
    const setAlertHandler = (messages, type='danger') => {
        const id = Math.floor(Math.random() * 1000)
        
        const alert = {
            id,
            messages,
            type
        }

        dispath({type: SET_ALERT, payload: alert});

        setTimeout(() => {
            dispath({type: REMOVE_ALERT, payload: id});
        }, 5000);
    }
    
    return (
        <AlertContext.Provider value={{
            setAlert: setAlertHandler,
            alerts: state
        }} >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
