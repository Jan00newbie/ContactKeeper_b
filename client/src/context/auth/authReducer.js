import {
    AUTH_SUCCESS,
    LOAD_USER_SUCCESS,
    LOGOUT
} from '../types';

export default (state, change) => {
    switch (change.type) {

        case AUTH_SUCCESS:  
            localStorage.setItem('token', change.payload)
            return {
                ...state,
                isAuthenticated: true
            }

        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user:change.payload
            };
    
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        
        default:
            throw new Error("Bad action!")
    }
};