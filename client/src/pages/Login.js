import React, { useState } from 'react'
import './Login.scss'
import axios from 'axios'
import { server } from './GlobalVariables'
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, setUser] = useState({})

    let history = useHistory()

    const handleLogin = (data) => {
        setUser(data)
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
           axios.post(`${server}/api/auth/login`, {
                email: username, 
                password: password
            })
            .then((res) => {
                if(res.status === 200) {
                    if(res.data.user) {
                        handleLogin(res.data.user)
                        localStorage.setItem('user', JSON.stringify(res.data.user))
                        setUser(res.data.user)
                    }
                    console.log(res.data.user, user)

                    history.push({
                        pathname: '/home', 
                        state: { token: res.data.user.token}})
                }
            })
            .catch((error) => {
                console.log(error)
            })
        } catch (e) {
            alert(e.message);
        }
    }



    return (
        <div className='d-flex flex-column'>
            <div className='form-wrapper position-relative ontainer-sm shadow p-3 mb-5 bg-body 
            ml-2 mr-2 d-flex flex-column justify-content-center rounded'>
                <h2 className='h2 mb-3'> Login </h2>
                <Form>
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
                    <label htmlFor="email-input">Email address</label>
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
                    <label htmlFor="pass-input">Password</label>
                </div>
                    <button 
                    className='btn btn-primary m-2'
                    type='button'
                    onClick={(e) => {
                        handleSubmit(e)
                    }}> Login </button>
                </Form>


            </div>
        </div>
        
    )
}

export default Login