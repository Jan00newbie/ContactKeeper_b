import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAILED,
    LOGIN_FAILED,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from '../types';

export default (state, change) => {
    switch (change.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:   
            localStorage.setItem('token', change.payload)
            return {
                ...state,
                isAuthenticated: true
            }
    
        case REGISTER_FAILED:
        case LOGIN_FAILED:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false
            }
        
        case GET_USER_SUCCESS:
            return {
                ...state,
                user:change.user
            };
            
        case GET_USER_SUCCESS:
            return state;

        default:
            break;
    }
};