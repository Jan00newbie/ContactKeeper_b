import React, {useReducer} from 'react';
import AuthContext from "./authContext";

import authReducer from './authReducer'

import { LOGIN_SUCCESS, LOGIN_FAILED } from '../types'


const AuthState = props => {

    const [state, dispath] = useReducer(authReducer, {
        isAuthenticated: false
    })

    const loginHandler = userLoginData => {
        fetch('/auth', {
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify(userLoginData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                dispath({
                    type: LOGIN_SUCCESS,
                    payload: data.token
                })
            }else{
                dispath({type: LOGIN_FAILED});
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <AuthContext.Provider value={{
            login: loginHandler,
            isAuthenticated: state.isAuthenticated
        }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
