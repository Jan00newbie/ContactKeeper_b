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

const ContactItem = ({contact}) => {
    const context = useContext(contactContext)
    console.log(contact);
    
    const {id} = contact

    
    const [formOpen, setFormOpen] = useState(false);

    const handleDelete = () => {
        context.deleteContact(id)
    };

    const handleUpdate = () => {
        setFormOpen(true);
    };
    
    const handleFormSubmit = contactFormData =>{

        context.updateContact({id, ...contactFormData});
        setFormOpen(false);
    }

    return (
        <div style={styles}>
            {formOpen 
                ? <ContactForm
                    {...contact}
                    submitHandler={handleFormSubmit}
                    />
                : <Contact
                    {...contact}
                    deleteHandler={handleDelete}
                    updateHandler={handleUpdate}/>}
        </div>
    )
}

export default ContactItem
