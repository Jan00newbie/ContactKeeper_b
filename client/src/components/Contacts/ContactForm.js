import React, {useState} from 'react'

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

    const handleRestoreToDefault = e => {
        e.preventDefault();
        setUserInput({
            name,
            email,
            phone
        });
    }

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
            <label htmlFor="name">Name</label><input name='name' onChange={handleChange} value={userInput.name||''} placeholder="Enter name..." type="text" required/>
            <label htmlFor="email">Email</label><input name='email' onChange={handleChange} value={userInput.email||''} placeholder="Enter email..." type="text"/>
            <label htmlFor="name">Phone</label><input name='phone' onChange={handleChange} value={userInput.phone||''} placeholder="Enter phone..." type="text"/>
            <button className="btn btn-pos" onClick={handleSubmit}>{id ? 'Change': 'Add'}</button>
            <button className="btn btn-neu" onClick={handleRestoreToDefault}>{id ? 'Restore': 'Clear'}</button>
        </form>
    )
}

export default ContactForm