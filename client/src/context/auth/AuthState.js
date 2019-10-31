import React, {useReducer} from 'react';
import AuthContext from "./authContext";

import authReducer from './authReducer'

import { LOGIN_SUCCESS, LOGIN_FAILED, GET_USER_FAILED, GET_USER_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILED } from '../types'


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
            console.log(data);
            const action = (data.token) 
                ? { type: LOGIN_SUCCESS, payload: data.token }
                : { type: LOGIN_FAILED };
            dispath(action);
        })
        .catch(err => console.log(err))
    }

    const registerHandler = userLoginData => {
        fetch('/user', {
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify(userLoginData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            const action = (data.token) 
                ? { type: REGISTER_SUCCESS, payload: data.token }
                : { type: REGISTER_FAILED };
            dispath(action);
        })
        .catch(err => console.log(err))
    }

    const getUser = () => {
        fetch('/user')
        .then(res => res.json())
        .then(data => {
            const action = (data) 
                ? { type: GET_USER_SUCCESS, payload: data.user }
                : { type: GET_USER_FAILED };
            dispath(action);
        })
        .catch(err => console.log(err))
    }
    return (
        <AuthContext.Provider value={{
            login: loginHandler,
            register: registerHandler,
            isAuthenticated: state.isAuthenticated,
            getUser
        }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
