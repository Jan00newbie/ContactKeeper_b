import React from 'react';
import ContactItem from './ContactItem';

const styles = {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};

const ContactList = ({contacts, filter}) =>
    <div style={styles}>
        {contacts.map(contact =>
            <ContactItem 
                key={contact.id}
                contact={contact}/>    
        )}
    </div>

export default ContactList;
