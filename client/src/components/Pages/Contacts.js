import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

import ContactForm from '../Contacts/ContactForm';
import FlitringList from '../Contacts/FlitringList';

const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '3em'
}

const Contacts = () => {

    const {contacts, addContact} = useContext(ContactContext);

    return (
        <div style={style}>
            <ContactForm submitHandler={addContact}/>
            <FlitringList contacts={contacts}/>
        </div>
    )
}

export default Contacts
