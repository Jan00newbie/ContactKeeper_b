import React, {useReducer} from 'react';

import request from '../../utils/request';

import AuthContext from "./authContext";
import authReducer from './authReducer';

import { LOGIN_SUCCESS, LOGIN_FAILED, GET_USER_FAILED, GET_USER_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILED } from '../types'


const AuthState = props => {

    const initialState = {
        isAuthenticated: !!localStorage.getItem('token'),
        user: null,
        error: null
    }

    const [state, dispath] = useReducer(authReducer, initialState)



    
    const loginHandler = userLoginData => {
        const header = {
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify(userLoginData)
        }
        
        request('/auth', header, data => {
            const action = (data.token) 
                ? { type: LOGIN_SUCCESS, payload: data.token }
                : { type: LOGIN_FAILED };
            dispath(action);
            getUser();
        })
    }

    const registerHandler = userLoginData => {
        const header = {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userLoginData)
        }

        request('/user', header, data => {
            console.log('register: ', data);

            const action = (data.token) 
                ? { type: REGISTER_SUCCESS, payload: data.token }
                : { type: REGISTER_FAILED };
            dispath(action);
            getUser();
        })
    }

    const getUser = () => {
        const header = {
            headers:{
                "Authorization": `Brearer ${localStorage.getItem('token')}`
            }
        }

        request('/user', header, data => {
            console.log('getUser:', data);
            const action = (data) 
                ? { type: GET_USER_SUCCESS, payload: data }
                : { type: GET_USER_FAILED };
            dispath(action);
        })
    }
    return (
        <AuthContext.Provider value={{
            login: loginHandler,
            register: registerHandler,
            getUser,
            isAuthenticated: state.isAuthenticated,
            user:state.user,
        }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
