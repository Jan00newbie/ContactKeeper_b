import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import authContext from '../../context/auth/authContext'

const style = {
    display: 'flex',
    flexDirection: 'column'
}

const Login = ({submitAction}) => {
    const { isAuthenticated } = useContext(authContext)
    const history = useHistory();

    const [input, setInput] = useState({email: '', password:''})
    
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
        submitAction({
            email: input.email,
            password: input.password
        })
    }

    return (
        <form style={style}>
            <h1>Get sign in!</h1>
                <label htmlFor="email">Email</label>
                <input name="email" onChange={onChange} type="text" value={input.email}/>
                <label htmlFor="password">Password</label>
                <input name="password" onChange={onChange} type="text" value={input.password}/>
            <button className="btn btn-neu" onClick={onSubmit}>Login</button>
        </form>
    )
}

export default Login
