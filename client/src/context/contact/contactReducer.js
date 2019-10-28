import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CONTACT,
    UPDATE_CONTACT
} from '../types';

const reducer = (state, change) => {
    switch (change.type) {
        case ADD_CONTACT:
            return {
                ...state, 
                contacts:[...state.contacts, change.contact]
            };
            
        case DELETE_CONTACT:
            return {
                ...state, 
                contacts:[...state.contacts].filter(contact => contact.id !== change.contactId)
            };

        case UPDATE_CONTACT:
            return {
                ...state, 
                contacts: [...state.contacts].map(contact => 
                    contact.id === change.contact.id
                        ? Object.assign(contact, change.contact)
                        : contact)
            };
            
        default:
            break;
    }
    return state;
}

export default reducer