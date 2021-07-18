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

    const handleNameChange = (e) => {                                
        setName(e.target.value)
        if(e.target.value.length < 4) {
            document.getElementById('user-input').classList.remove('is-valid') 
            document.getElementById('user-input').classList.add('is-invalid')
        }
        else {
            document.getElementById('user-input').classList.remove('is-invalid')
            document.getElementById('user-input').classList.add('is-valid')
        }
    }

    const handleEmailChange = (e) => {
        setUsername(e.target.value)
        if(e.target.value.includes('@gmail.com') || e.target.value.includes('@yahoo.com') || e.target.value.includes('@stud.ase.ro')) {
            document.getElementById('email-input').classList.add('is-valid') 
            document.getElementById('email-input').classList.remove('is-invalid')
        }
        else {
            document.getElementById('email-input').classList.add('is-invalid')
            document.getElementById('email-input').classList.remove('is-valid')
        }
    }

    const handlePassChange = (e) => {                                 
        setPassword(e.target.value)
        if(e.target.value.length < 5) {
            document.getElementById('pass-input').classList.remove('is-valid') 
            document.getElementById('pass-input').classList.add('is-invalid')
        }
        else {
            document.getElementById('pass-input').classList.remove('is-invalid')
            document.getElementById('pass-input').classList.add('is-valid')
        }

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
                            onChange={(e) => handleNameChange(e)}/>
                        <label htmlFor="name-input">Name</label>
                        <div className="valid-feedback">
                            Wonderful name! 💜  
                        </div>
                        <div className="invalid-feedback">
                            Name should be at lead 4 characters long 😔
                        </div>
                    </div>
                    <div className='email-wrapper d-flex flex-column form-floating mb-3'>
                        <Form.Control 
                            as='input'
                            required
                            type='email' 
                            className='form-control' 
                            id='email-input' 
                            placeholder='name@example.com'
                            onChange={(e) => handleEmailChange(e)}/>
                        <label htmlFor="email-input">Email address</label>
                        <div className="valid-feedback">
                            Looks good! 👀 
                        </div>
                        <div className="invalid-feedback">
                            Invalid email address 😔
                        </div>
                    </div>
                    <div className='pass-wrapper form-floating mb-3'>
                        <Form.Control 
                            required
                            as='input'
                            type='password' 
                            className='form-control' 
                            id='pass-input'
                            placeholder='Password'
                            onChange={(e) => handlePassChange(e)}/>
                        <label htmlFor="pass-input">Password</label>
                        <div className="valid-feedback">
                            Looks good! 👀 
                        </div>
                        <div className="invalid-feedback">
                            Password should be at leas 5 characters long 😔
                        </div>
                    </div>
                    <button className='btn btn-primary'
                    type='submit'
                    onClick={(e) => {
                        handleSubmit(e)
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