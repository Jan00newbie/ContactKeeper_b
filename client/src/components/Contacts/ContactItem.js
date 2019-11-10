import React, {useContext, useState} from 'react'
import contactContext from '../../context/contact/contactContext'
import ContactForm from './ContactForm'
import Contact from './Contact'

const styles = {
    boxShadow: "0 2px 4px 0 grey",
    padding: "1em",
    marginTop: "1em",
    borderRadius: "10px"
}

const ContactItem = ({contact:{id, name, email, phone}}) => {
    const context = useContext(contactContext)

    const [formOpen, setFormOpen] = useState(false);

    const handleDelete = id => {
        context.deleteContact(id)
    };

    const handleUpdate = () => {
        setFormOpen(true);
    };
    
    const handleFormSubmit = contact =>{
        context.updateContact(id, contact);
        setFormOpen(false);
    }

    return (
        <div style={styles}>
            {formOpen 
                ? <ContactForm
                    id={id}
                    name={name}
                    email={email}
                    phone={phone}
                    submitHandler={handleFormSubmit}
                    />
                : <Contact
                    id={id}
                    name={name}
                    email={email}
                    phone={phone}
                    deleteHandler={handleDelete}
                    updateHandler={handleUpdate}/>}
        </div>
    )
}

export default ContactItem
