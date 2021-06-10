import { useState, useEffect } from "react"
import { useHistory } from 'react-router'
import User from "../components/User"
import WordTest from "../components/WordTest"
import axios from 'axios'
import {server} from '../pages/GlobalVariables'


const Learn = (props) => {
    const [words, setWords] = useState(props.location.state.words)
    const [user, setUser] = useState(props.location.state.user)
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

    
    useEffect(() => {
        updateUser()
        return () => {
            
        }
    }, [words])

    return (
        <div className='d-flex flex-column mt-5'>
            <div className='row'> Welcome,
                <User user={user}/>
            </div>
            <WordTest words={words} flag={Math.floor(Math.random() * words.length)}></WordTest>
            <button
                type='submit'
                className='btn btn-dark position-absolute m-3 top-0 end-0'
                onClick={(e) => {
                    history.push('/')
                }}> Quit </button>
        </div>
    )
}

export default Learn