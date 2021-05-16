import React, { useState } from 'react'
import './Login.scss'
import axios from 'axios'
import { server } from './GlobalVariables'
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()

    let history = useHistory()

    return(
        <>
            <div className='form-wrapper position-relative container-sm shadow p-3 mb-5 bg-body 
            ml-2 mr-2 d-flex flex-column justify-content-center rounded'>
                <h2 className='h2 mb-3'> Register </h2>
                <Form>
                    <div className='user-wrapper d-flex flex-column form-floating mb-3'>
                        <Form.Control 
                            as='input'
                            type='text' 
                            className='form-control' 
                            id='user-input' 
                            placeholder='Name'
                            onChange={(e) => {
                                setName(e.target.value)
                            }}/>
                        <label for="name-input">Name</label>
                    </div>
                    <div className='email-wrapper d-flex flex-column form-floating mb-3'>
                        <Form.Control 
                            as='input'
                            type='email' 
                            className='form-control' 
                            id='email-input' 
                            placeholder='name@example.com'
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}/>
                        <label for="email-input">Email address</label>
                    </div>
                    <div className='pass-wrapper form-floating mb-3'>
                        <Form.Control 
                            as='input'
                            type='password' 
                            className='form-control' 
                            id='pass-input'
                            placeholder='Password'
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}/>
                        <label for="pass-input">Password</label>
                    </div>
                    <button className='btn btn-primary'
                    type='button'
                    onClick={(e) => {
                        axios.post(`${server}/api/auth/register`, {
                                    name: name,
                                    email: username, 
                                    password: password
                                })
                                .then((res) => {
                                    console.log(res)
                                    if(res.status === 200) {
                                        history.push('/login')
                                    }
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                    }}> Sign up </button>
                </Form>
            </div>
            
        </>
    )
}

export default Register