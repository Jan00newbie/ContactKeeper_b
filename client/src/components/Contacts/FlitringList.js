import React, {useState, useEffect} from 'react'
import TextInput from '../Layout/TextInput';

const FlitringList = ({data = [], children, placeholder}) => {

    const [items, setItems] = useState([]);
    
    useEffect(() => {
        setItems(data)
    }, [data]);

    const changeFilter = filter => {
        const filtredItems = [...items].filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
        setItems(filtredItems)
    }
    
    const listWithItems = React.cloneElement(children, { items })

    return (
        <div>
            <TextInput 
                onChange={changeFilter} 
                placeholder={placeholder}/>
            {listWithItems}
        </div>
    )
}

export default FlitringList
