import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    GET_CONTACTS_SUCCESS,
    CLEAR_CONTACT_STATE
} from '../types';

const reducer = (state, change) => {
    switch (change.type) {
        case ADD_CONTACT:
            return {
                ...state, 
                contacts:[...state.contacts, change.payload]
            };
            
        case DELETE_CONTACT:
            return {
                ...state, 
                contacts:[...state.contacts].filter(contact => contact.id !== change.payload)
            };

        case UPDATE_CONTACT:
            return {
                ...state, 
                contacts: [...state.contacts].map(contact => 
                    contact.id === change.payload.id
                        ? Object.assign(contact, change.payload)
                        : contact)
            };
            
        case GET_CONTACTS_SUCCESS:
            return {
                ...state, 
                contacts: change.payload
            };

        case CLEAR_CONTACT_STATE:
            return {
                ...state, 
                contacts:[]
            };
            
        default:
            break;
    }
    return state;
}

export default reducer