import React, {
    useReducer,
    useContext
} from 'react';

import contactContext from './contactContext';
import authContext from '../auth/authContext';
import alertContext from '../alert/alertContext';


import contactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    GET_CONTACTS_SUCCESS,
    CLEAR_CONTACT_STATE
} from '../types';
import request from '../../utils/request';
import { cleanFalsyProps } from '../../utils/util';


const ContactState = props => {

    const {logout} = useContext(authContext)
    const {setAlert} = useContext(alertContext)
    const initialState = {
        contacts: []
    };
    const [state, dispath] = useReducer(contactReducer, initialState);

    const handleRequestError = exception => {

        if(exception.warnings){
            setAlert(exception.warnings, exception.type);
        } else if (exception.errors){
            dispath({type: CLEAR_CONTACT_STATE});
            logout();
            setAlert(exception.errors, exception.type);
        } else {
            throw new Error(`Unsupported error type ${exception.type}`);
        }
    }

    const addContactHandler = contact => {
        const sanitizedData = cleanFalsyProps({...contact});

        request('/contacts', {method: 'POST', body: JSON.stringify(sanitizedData)})
        .then(data => {
            console.log(data);
            dispath({type: ADD_CONTACT, payload: data});
        })
        .catch(handleRequestError)
    }

    const deleteContactHandler = id => {

        request(`/contacts/${id}`, {method: 'DELETE'})
        .then(data => {
            setAlert(data.msg, 'NOTICE');
            dispath({type: DELETE_CONTACT, payload: id});
        })
        .catch(handleRequestError)
    }

    const updateContactHandler = ({id, ...contactData}) => {
        const sanitizedData = cleanFalsyProps(contactData);

        request(`/contacts/${id}`, {method: 'PUT', body:JSON.stringify(sanitizedData)})
        .then(data => {
            dispath({type: UPDATE_CONTACT, payload: data})
        })
        .catch(handleRequestError)

    }

    const getContactsHandler = () => {
        request('/contacts')
        .then(data => {
            dispath({type: GET_CONTACTS_SUCCESS, payload: data})
        })
        .catch(handleRequestError)
    }

    const clearStateHandler = () => {
        dispath({type:CLEAR_CONTACT_STATE})
    }

    return (
        <contactContext.Provider
            value = {{
                contacts: state.contacts,
                addContact: addContactHandler,
                deleteContact: deleteContactHandler,
                updateContact: updateContactHandler,
                getContacts: getContactsHandler,
                clearState: clearStateHandler
            }}>
            {props.children}
        </contactContext.Provider>
    );
}

export default ContactState;