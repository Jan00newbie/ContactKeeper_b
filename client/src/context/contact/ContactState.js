import React, {
    useReducer,
    useContext
} from 'react';

import ContactContext from './contactContext';
import AuthContext from '../auth/authContext';

import contactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    GET_CONTACTS_SUCCESS,
    CLEAR_CONTACT_STATE
} from '../types';


const ContactState = props => {

    const {request} = useContext(AuthContext)

    const initialState = {
        contacts: []
    };
    const [state, dispath] = useReducer(contactReducer, initialState);

    
    const addContactHandler = contact => {
        dispath({type: ADD_CONTACT, payload: contact});
    }

    const deleteContactHandler = contactId => {
        dispath({type: DELETE_CONTACT, payload:contactId});
    }

    const updateContactHandler = contact => {
        dispath({type: UPDATE_CONTACT, payload: contact});
    }

    const getContactsHandler = () => {
        const callback = data => {
            dispath({type: GET_CONTACTS_SUCCESS, payload: data})
        }

        request('/contacts', callback)
    }

    const clearStateHandler = () => {
        dispath({type:CLEAR_CONTACT_STATE})
    }

    return (
        <ContactContext.Provider
            value = {{
                contacts: state.contacts,
                addContact: addContactHandler,
                deleteContact: deleteContactHandler,
                updateContact: updateContactHandler,
                getContacts: getContactsHandler,
                clearState: clearStateHandler
            }}>
            {props.children}
        </ContactContext.Provider>
    );
}

export default ContactState;