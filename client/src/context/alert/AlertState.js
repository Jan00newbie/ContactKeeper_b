import React, {useReducer} from 'react';

import request from '../../utils/request';

import AlertContext from "./alertContext";
import alertReducer from './alertReducer';

import {  } from '../types'


const AlertState = props => {

    const initialState = []

    const [state, dispath] = useReducer(alertReducer, initialState)
    
    const setAlertHandler = () => {
        setTimeout(() => {
            dispath({type: SET_ALERT})
        }, 5000);
    }
    
    return (
        <AlertContext.Provider value={{
            setAlert: setAlertHandler,
            contacts: state
        }} >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
