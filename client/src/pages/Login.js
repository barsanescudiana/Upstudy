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

    
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    };

    const handleLogin = (data) => {
        setUser(data)
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if(document.getElementById('email-input').value === '') {
            document.getElementById('email-input').classList.add('is-invalid')
        } else {
            document.getElementById('email-input').classList.remove('is-invalid')
            document.getElementById('email-input').classList.add('is-valid')
            if(document.getElementById('pass-input').value === '') {
                document.getElementById('pass-input').classList.add('is-invalid')
            } else {
                document.getElementById('pass-input').classList.remove('is-invalid')
                document.getElementById('pass-input').classList.add('is-valid')
         
            try {
            
           axios.post(`${server}/api/auth/login`, {
                email: username, 
                password: password
            }, axiosConfig)
            .then((res) => {
                if(res.status === 200) {
                    if(res.data.user) {
                        handleLogin(res.data.user)
                        localStorage.setItem('user', JSON.stringify(res.data.user))
                        setUser(res.data.user)
                    }
                    console.log(res.data.user, user)

                    history.push({
                        pathname: '/', 
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
    }
}



    return (
        <div className='d-flex flex-column justify-content-center align-items-center m-5'>
            <div className='form-wrapper position-relative shadow p-3 mb-5 bg-body 
            ml-2 mr-2 d-flex flex-column justify-content-center rounded'>
                <h2 className='h2 mb-3'> Login </h2>
                <Form>
                    <div className='email-wrapper d-flex flex-column form-floating mb-3'>
                    <Form.Control 
                        as='input'
                        required
                        type='email' 
                        className='form-control' 
                        id='email-input' 
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}/>
                    <label htmlFor="email-input">Email address</label>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please enter your email.
                    </div>
                </div>
                <div className='pass-wrapper form-floating mb-3'>
                    <Form.Control 
                        as='input'
                        required
                        type='password' 
                        className='form-control' 
                        id='pass-input'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    <label htmlFor="pass-input">Password</label>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please enter your password.
                    </div>
                </div>
                    <button 
                    className='btn btn-primary m-2'
                    type='submit'
                    onClick={(e) => {
                        handleSubmit(e)
                        console.log(password)
                    }}> Login </button>
                    <p>
                       <small> Do not have an account? <a href='/register' className='text-primary'> 
                       <br/>Register now</a>! </small> 
                    </p>
                </Form>


            </div>
        </div>
        
    )
}

export default Login