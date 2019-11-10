import React, {useReducer, useContext} from 'react';

import createRequest from '../../utils/request';

import AlertContext from '../alert/alertContext';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
    AUTH_SUCCESS,
    LOAD_USER_SUCCESS,
    FATAL_ERROR
} from '../types'


const AuthState = props => {
    const initialState = {
        isAuthenticated: !!localStorage.getItem('token'),
        user: null,
        error: null
    }
    const [state, dispath] = useReducer(authReducer, initialState)
    
    const authErrorHandler = error => {
        dispath({type: FATAL_ERROR, payload: error})
    }
    const request = createRequest(authErrorHandler)

    const authHandler = userLoginData => {
        const header = {
            method:'POST',
            body: JSON.stringify(userLoginData)
        }

        const callback = data => {
            console.log("data",data)
            if (!data.token){
                throw new Error('Problem with authentication! Please log again')
            }
            dispath({type: AUTH_SUCCESS, payload:data.token})
        }
        
        request('/auth', callback, header)
    }

    const loadUserHandler = () => {
        const header = {
            headers:{
                "Authorization": `Brearer ${localStorage.getItem('token')}`
            }
        }

        const callback = data => {
            dispath({type: LOAD_USER_SUCCESS, payload:data})
        }

        request('/user', callback, header);
    }
    return (
        <AuthContext.Provider value={{
            auth: authHandler,
            loadUser: loadUserHandler,
            isAuthenticated: state.isAuthenticated,
            user:state.user,
            request
        }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
