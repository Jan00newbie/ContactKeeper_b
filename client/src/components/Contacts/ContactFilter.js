import React, {useState} from 'react'

const ContactFilter = ({filterItems}) => {
    const [input, setInput] = useState('');

    const handleChange = e => {
        e.preventDefault();
        const value = e.target.value;
        setInput(value);
        filterItems(value);
    }
    
    return (
        <div>
            <label htmlFor="filter">Filter contacts</label>
            <input name="filter" type="text" onChange={handleChange} value={input} />
        </div>
    )
}

export default ContactFilter
