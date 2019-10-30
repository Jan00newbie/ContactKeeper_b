import React, {useState} from 'react'

import ContactList from '../Contacts/ContactList';
import ContactFilter from '../../components/Contacts/ContactFilter'

const FlitringList = ({contacts}) => {

    const [filter, setFilter] = useState('');

    const filtredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

    const filterHandler = filter => {
        setFilter(filter)
    }

    return (
        <div>
            <ContactFilter filterItems={filterHandler}/>
            <ContactList
                filter={filter}
                contacts={filtredContacts}/>
        </div>
    )
}

export default FlitringList
