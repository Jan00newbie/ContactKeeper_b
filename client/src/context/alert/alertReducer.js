import {SET_ALERT, REMOVE_ALERT} from '../types'

const alertReducer = (state, change) => {
    switch (change.type) {
        case SET_ALERT:
            return [...state, change.payload]
              
        case REMOVE_ALERT:
            return [...state].filter(alert => alert.id !== change.payload);

        default:
            break;
    }
}

export default alertReducer