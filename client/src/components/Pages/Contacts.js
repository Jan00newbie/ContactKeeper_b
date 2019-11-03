import React, { useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

import ContactForm from '../Contacts/ContactForm';
import FlitringList from '../Contacts/FlitringList';
import ContactList from '../Contacts/ContactList';

const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '3em'
}

const Contacts = () => {
    
    const {contacts, addContact, getContacts} = useContext(ContactContext);

    
    useEffect(() => {
        getContacts();
    }, [])
    console.log(contacts);
    
    return (
        <div style={style}>
            <ContactForm submitHandler={addContact}/>
            <FlitringList data={contacts} placeholder="filter contacts">
                <ContactList/>
            </FlitringList>
        </div>
    )
}

export default Contacts
