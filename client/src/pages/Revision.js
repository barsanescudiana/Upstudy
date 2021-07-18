import { useState, useEffect} from "react"
import { useHistory } from "react-router"
import axios from 'axios'
import {server} from './GlobalVariables'
import uuid from "react-uuid"
import Card from '../components/Card'

const Revision = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [current, setCurrent] = useState(null)
    const history = useHistory()

    const updateUser = () => {
        axios.get(`${server}/api/user/${user.email}`)
        .then(res => {
            console.log(res.data)
            setUser(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
        })
        .catch(err => {
            console.err(err)
        })
    }

    const handleSubmit = (e, word) => {
        e.preventDefault()
        axios.post(`${server}/api/user/revision/${word.base}`, {
                token: user.token,
                grade:  document.getElementById(`grade-div-${word.base}`).innerText
            })
        .then(res => {
            updateUser()
            localStorage.setItem('user', JSON.stringify(user))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleBack = (e) => {
        e.preventDefault()
        history.push('/')
    }

    useEffect(() => {
        updateUser()
        setCurrent(new Date())
    }, [])

    return (
        <> 
        {user ? (
            <>
                <button
                    type='submit'
                    className='btn btn-outline-danger position-absolute m-3 top-0 end-0'
                    onClick={(e) => {
                        history.push('/')
                    }}> <i className="fas fa-times"></i> Exit </button>
                <div className='d-grid'>
                    <div className='row mt-2'>
                        <p> 
                            <span className='h5 text-primary'> ❔ How it works  </span>
                            <br/> You need to <mark>revision the words presented on cards</mark>, and based on how fast you managed to remember the correct translation, grade the words using these guides:  
                        </p>
                        <ul>
                            <li> 5 - perfect response </li>
                            <li> 4 - correct response after a hesitation </li>
                            <li> 3 - correct response recalled with serious difficulty </li>
                            <li> 2 - incorrect response; where the correct one seemed easy to recall </li>
                            <li> 1 - incorrect response; the correct one remembered </li>
                            <li> 0 - complete blackout </li>
                        </ul>
                    { user.knownWords.filter(word => new Date(word.dueDate) <= current).length !== 0 ? (
                        user.knownWords.filter(word => new Date(word.dueDate) <= current).map(word => (
                            <div className='m-1 p-1 col col-sm d-flex align-items-center justify-content-center flex-column' key={uuid()}> 
                                <Card word={word} isClicked={true}/>
                                <input
                                    id='grade-input'
                                    max={5}
                                    min={0}
                                    type='range'
                                    className='slider-primary'
                                    onInput={ (e) =>
                                        document.getElementById(`grade-div-${word.base}`).innerText = e.target.value
                                    }>
                                </input>
                                <label htmlFor='grade-input'> Grade this word! </label>
                                <div id={`grade-div-${word.base}`} ></div>
                                <button
                                    className='btn btn-outline-success'
                                    onClick={(e) => {handleSubmit(e, word)}} 
                                    > Submit evaluation </button>
                            </div>
                        ))
                    ) : (
                        
                        <div className='row align-items-center text-aling-center d-flex flex-column justify-content-center'> 
                            <h4 className='h4 text-primary text-center'> There are no words you need to revision! 🎊 Keep checking this page daily! 👀</h4> 
                            <button className=' row align-items-center btn btn-success w-50'
                            onClick={(e) => handleBack(e)}> Amazing, take me back! </button>
                        </div>
                    )}
                    </div>
                </div>
            </>
        ) : (
            <div>
                Revision page
            </div>
        )}
        </>
    )
}

export default Revision