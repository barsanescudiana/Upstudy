import Form from 'react-bootstrap/Form'
import {useState, useCallback} from 'react'
import {useHistory} from 'react-router'
import axios from 'axios'
import {server} from '../pages/GlobalVariables'

const Edit = (props) => {

    const [user, setUser] = useState(props.user)
    const [email, setEmail] = useState(props.user.email)
    const [name, setName] = useState(props.user.name)
    const [password, setPassword] = useState(props.user.email)
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState(() => {
        updateUser()
    }), []);
    const history = useHistory()

    const updateUser = () => {
        axios.get(`${server}/api/user/${user.email}`)
        .then((res) => {
            setUser(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('clicked btn')
        axios.put(`${server}/api/user/update`, {
            token: user.token,
            name: name,
            email: email,
            password: password
        }).then((res) => {
            setUser(localStorage.getItem('user'))
            history.push('/')
            history.push({ 
                pathname: '/profile', 
                state: {
                    user: localStorage.getItem('user')
                }
            })
            forceUpdate()
        }).catch((err) => {
            console.error(err)
        })
        setUser(localStorage.getItem('user'))
    }

    

    return(
        <div>
             <Form>
                <div className='user-wrapper d-flex flex-column form-floating mb-3'>
                    <Form.Control 
                        as='input'
                        type='text' 
                        className='form-control' 
                        id='user-input' 
                        defaultValue={user.name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    <label htmlFor="name-input">Name</label>
                </div>
                <div className='email-wrapper d-flex flex-column form-floating mb-3'>
                    <Form.Control 
                        as='input'
                        type='email' 
                        className='form-control' 
                        id='email-input' 
                        defaultValue={user.email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    <label htmlFor="email-input">Email address</label>
                </div>
                 <div className='pass-wrapper form-floating mb-3'>
                    <Form.Control 
                        as='input'
                        type='password' 
                        className='form-control' 
                        id='pass-input'
                        defaultValue={user.password}
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
                }}> Update profile </button>
            </Form>
        </div>
    )
}

export default Edit