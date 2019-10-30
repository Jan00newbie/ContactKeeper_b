import React, {
    useReducer
} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: [{
            id: 1,
            name: "Amy",
            surname: "Banks",
            email: "chris@katz.kz",
            phone: "204-325-234"
        }, {
            id: 2,
            name: "Marilyn",
            surname: "Carter",
            email: "nathan@kinney.sa",
            phone: "204-325-234"
        }, {
            id: 3,
            name: "Dennis",
            surname: "Britt",
            email: "brooke@carlton.pr",
            phone: "204-325-234"
        }, {
            id: 4,
            name: "Gary",
            surname: "Middleton",
            email: "mary@berry.ne",
            phone: "204-325-234"
        }, {
            id: 5,
            name: "Edgar",
            surname: "Walton",
            email: "roberta@pritchard.cu",
            phone: "204-325-234"
        }, {
            id: 6,
            name: "Kathleen",
            surname: "Hamrick",
            email: "calvin@mccall.dz",
            phone: "204-325-234"
        }, {
            id: 7,
            name: "Clifford",
            surname: "Butler",
            email: "milton@griffin.fr",
            phone: "204-325-234"
        }, {
            id: 8,
            name: "Regina",
            surname: "Bowden",
            email: "wayne@hood.gg",
            phone: "204-325-234"
        }, {
            id: 9,
            name: "Thomas",
            surname: "Riddle",
            email: "janice@wu.ky",
            phone: "204-325-234"
        }, {
            id: 10,
            name: "Jeff",
            surname: "Coleman",
            email: "patrick@proctor.pe",
            phone: "204-325-234"
        }]
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

    return (
        <ContactContext.Provider
            value = {{
                contacts: state.contacts,
                addContact: addContactHandler,
                deleteContact: deleteContactHandler,
                updateContact: updateContactHandler
            }}>
            {props.children}
        </ContactContext.Provider>
    );
}

export default ContactState;