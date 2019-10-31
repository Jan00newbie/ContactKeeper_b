import React, { useState, useContext, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import authContext from '../../context/auth/authContext'

const style = {
    display: 'flex',
    flexDirection: 'column'
}

const SignForm = ({ submitHandler, inputsBean=[] }) => {
    const { isAuthenticated } = useContext(authContext)
    const history = useHistory();

    const initialState = inputsBean.reduce((prev, curr)=>
        Object.assign(prev, {[curr]: ''})
    ,{})

    const [input, setInput] = useState(initialState)
    
    useEffect(() => {
        if(isAuthenticated){
            history.push('/contacts')
        }
    }, [isAuthenticated])

    const onChange = e => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        submitHandler(input)
    }

    return (
        <form style={style}>
            <h1>Get sign in!</h1>

                {inputsBean.map(name => (
                    <Fragment key={name}>
                        <label htmlFor={name}>{name}</label>
                        <input name={name} onChange={onChange} type="text" value={input[name]}/>
                    </Fragment>
                ))}
            <button className="btn btn-neu" onClick={onSubmit}>Login</button>
        </form>
    )
}

export default SignForm
