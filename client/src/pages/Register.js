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

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${server}/api/auth/register`, {
            name: name,
            email: username, 
            password: password
        }, axiosConfig)
        .then((res) => {
            console.log(res)
            if(res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                history.push('/')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <div className='d-flex flex-column justify-content-center align-items-center m-5'>
            <div className='form-wrapper position-relative shadow p-3 mb-5 bg-body 
            ml-2 mr-2 d-flex flex-column justify-content-center rounded'>
                <h2 className='h2 mb-3'> Register </h2>
                <Form>
                    <div className='user-wrapper d-flex flex-column form-floating mb-3'>
                        <Form.Control 
                            as='input'
                            required
                            type='text' 
                            className='form-control' 
                            id='user-input' 
                            placeholder='Name'
                            onChange={(e) => {
                                setName(e.target.value)
                            }}/>
                        <label htmlFor="name-input">Name</label>
                    </div>
                    <div className='email-wrapper d-flex flex-column form-floating mb-3'>
                        <Form.Control 
                            as='input'
                            required
                            type='email' 
                            className='form-control' 
                            id='email-input' 
                            placeholder='name@example.com'
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}/>
                        <label htmlFor="email-input">Email address</label>
                    </div>
                    <div className='pass-wrapper form-floating mb-3'>
                        <Form.Control 
                            required
                            as='input'
                            type='password' 
                            className='form-control' 
                            id='pass-input'
                            placeholder='Password'
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}/>
                        <label htmlFor="pass-input">Password</label>
                    </div>
                    <button className='btn btn-primary'
                    type='submit'
                    onClick={(e) => {
                        handleSubmit(e)
                        console.log(password)
                    }}> Sign up </button>
                     <p className='mt-2'> 
                       <small> Already have an account? <a href='/login' className='text-primary'> 
                       <br/> Login here</a>! </small> 
                    </p>
                </Form>
            </div>
            
        </div>
    )
}

export default Register