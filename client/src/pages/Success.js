
import {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import {server} from './GlobalVariables'

const Success = (props) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [points, ] = useState(props.location.state.points)
    const history = useHistory()
    
    useEffect(() => {
        axios.get(`${server}/api/user/${user.email}`)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data))
            setUser(res.data)
        })
        .catch(err => {
            console.error(err)
        })
    })

    const handleGotIt = (e) => {
        e.preventDefault()
        history.push({
            pathname: '/profile',
            state: {
                user: localStorage.getItem('user')
            }
        })
    }

    const handleKeepLearning = (e) => {
        e.preventDefault()
        history.push({
            pathname: '/',
            state: {
                user: localStorage.getItem('user')
            }
        })
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center m-5'>
            <div className='form-wrapper position-relative shadow p-3 mb-5 bg-body 
            ml-2 mr-2 d-flex flex-column justify-content-center align-items-center rounded'>
                <h1> 🏆 </h1>
                <h3 className='mb-3 text-dark text-center'> Congratulations, <span className='text-primary'> {user.name}</span>!</h3>
                <h6> 🥳 You just earned {points} points. </h6>
                <p className='text-center align-items-center mt-2'> You finished this set of words! Keep learning to improve your Spanish 💃 </p>
                <div className='d-flex flex-row'> 
                    <button
                        className='btn btn-sm btn-outline-warning rounded m-1'
                        onClick={(e) => {handleGotIt(e)}}>
                            Got it
                    </button>
                    <button
                        className='btn btn-sm btn-primary rounded m-1'
                        onClick={(e) => {handleKeepLearning(e)}}>
                            Keep learning! 🧐
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Success