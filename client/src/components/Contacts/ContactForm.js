import React, {useState, useContext} from 'react'
import ContactContext from '../../context/contact/contactContext'

const style = {
    display: 'flex',
    flexDirection: 'column'
}

const ContactForm = ({id, name='', email='', phone='', submitHandler}) => {
    
    const [userInput, setUserInput] = useState({
        name,
        email,
        phone
    });

    const handleChange = e => {
        e.preventDefault();

        const inputName = e.target.name;
        const newValue = e.target.value;

        setUserInput({
            ...userInput,
            [inputName]: newValue
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        submitHandler({
            name: userInput.name,
            email: userInput.email,
            phone: userInput.phone
        });
    }

    return (
        <form style={style}>
            <label htmlFor="name">Name</label><input name='name' onChange={handleChange} value={userInput.name} type="text"/>
            <label htmlFor="email">Email</label><input name='email' onChange={handleChange} value={userInput.email} type="text"/>
            <label htmlFor="name">Phone</label><input name='phone' onChange={handleChange} value={userInput.phone} type="text"/>
            <button onClick={handleSubmit}>{id ? 'Change': 'Add'}</button>
        </form>
    )

}

export default ContactForm