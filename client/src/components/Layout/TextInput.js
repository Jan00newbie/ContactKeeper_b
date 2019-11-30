import React, {useState} from 'react'

const TextInput = ({onChange, placeholder}) => {
    const [input, setInput] = useState('');

    const handleChange = e => {
        e.preventDefault();
        const value = e.target.value;
        onChange(value);
        setInput(value);
    }
    
    return (
        <input name="filter" type="text" onChange={handleChange} value={input} placeholder={placeholder}/>
    )
}

export default TextInput
