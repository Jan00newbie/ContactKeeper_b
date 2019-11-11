import React, {Fragment} from 'react'

const Contact = ({name, email, phone, deleteHandler, updateHandler}) => {
    return (
        <Fragment>
            <h3>{name}</h3>
            {email ?<p>Email: {email}</p> :''}
            {phone ?<p>Phone: {phone}</p> :''}
            <button className="btn btn-neg" onClick={deleteHandler}>Delete</button>
            <button className="btn btn-pos" onClick={updateHandler}>Update</button>
        </Fragment>
    )
}

export default Contact
