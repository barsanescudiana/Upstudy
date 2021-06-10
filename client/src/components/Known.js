import {useState} from 'react'
import { useHistory} from 'react-router'
import axios from 'axios'
import {server} from '../pages/GlobalVariables'
import uuid from 'react-uuid'

const Known = (props) => {

    const [user, setUser] = useState(props.user)
    const [words, setWords] = useState(props.user.knownWords)
    const [, setClicked] = useState('')
    const history = useHistory()

    const updateUser = () => {
        axios.get(`${server}/api/user/${user.email}`)
        .then((res) => {
            setUser(res.data)
            setWords(res.data.knownWords)
            localStorage.setItem('user', JSON.stringify(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleCreateNote = (e, word) => {
        e.preventDefault()
        setClicked('create')
        document.getElementById(`div-${word.base}`).style.visibility = 'visible'
        document.getElementById(`div-${word.base}`).style.display = 'block'
        axios.post(`${server}/api/user/note/${word.base}`, {
            token: user.token,
            notes: e.target.value
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.error(err)
        })    
        
        updateUser()
    }

    const handleEditNote = (e, word) => {
        e.preventDefault()
        setClicked('create')
        axios.post(`${server}/api/user/note/${word.base}`, {
            token: user.token,
            notes: e.target.value
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.error(err)
        })    
        
        updateUser()
    }

    const generate = (element) => { return `div-${element.base}` } 

    return (

        <div>
            { words.length === 0 ? (
                <>
                
                    <p> You have not learned any words yet. </p>
                    <button 
                        type='button' 
                        className='btn btn-primary'
                        onClick={(e) => {
                            e.preventDefault()
                            history.push('/')
                        }}> 📚 Start learning now!</button>
                </>
            ) : (
                <>
                    <label 
                        htmlFor="progress-range" 
                        className="form-label mb-0"> This is your progress </label>
                    <div className='d-flex flex-column justify-contetn-end align-items-end'> 
                        <div className="progress w-100">
                            <div 
                                className="progress-bar-animated progress-bar-striped bg-primary"
                                style={{width: (user.knownWords.length / 100) * 100 + '%'}}
                                role="progressbar" 
                                aria-valuenow={user.knownWords.length} 
                                aria-valuemin="0" 
                                aria-valuemax="100">    
                            </div>
                        </div>
                        <span className='text-secondary align-content-end text-align-end text-sm'> {user.knownWords.length}/100
                            <small className="text-muted"> words learned so far</small> 
                        </span>
                            <button 
                                type='button' 
                                className='btn btn-primary'
                                onClick={(e) => {
                                    e.preventDefault()
                                    history.push('/')
                            }}> 📚 Let's learn!</button>
                    </div>
                    
                    {   words.map(element => ( 
                    
                        <div id={uuid()} className='word-card rounded bg-light m-2 p-2'>
                        
                            <h3 className='text-dark col '> ✔️ {element.base} ▪ {element.target} 
                                <span id={uuid()} className='col p-0 text-light badge bg-secondary m-1 p-2 rounded-pill'> 🥇 {element.points} </span> 
                            </h3>
                                    
                            {element.notes ? (
                                <div 
                                    id={uuid()} 
                                    className='row'>
                                    
                                    <h5 className='mb-0 mt-1 text-primary'> 📓 Notes </h5>
                                    <textarea 
                                        className='b-block form-control text-wrap ms-4 me-4 m-2 w-75'
                                        rows='2'
                                        type='text'
                                        defaultValue={element.notes}
                                        onChange={(e) => {
                                            handleEditNote(e, element)
                                            updateUser()
                                        }}
                                        ></textarea>
                                    {/* <a 
                                        href='/' 
                                        className='text-primary'
                                        onClick={(e) => { 
                                            handleCreateNote(e, element)}
                                        }> Add new 📓  </a> */}
                                </div>
                            ) : (
                                <div>
                                    <textarea
                                        id={generate(element)}
                                        className='b-block form-control text-wrap ms-4 me-4 m-2 w-75'
                                        style={{visibility: 'hidden', display: 'none'}}
                                        rows='2'
                                        type='text'
                                        defaultValue={element.notes}
                                        onChange={(e) => {
                                            handleEditNote(e, element)
                                            updateUser()
                                        }}></textarea> 
                                    <a 
                                        href='/' 
                                        className='text-primary'
                                        onClick={(e) => {
                                            handleCreateNote(e, element)
                                            updateUser()
                                        }
                                        }> Create 📓  </a>
                                </div>
                            )}
                        </div>
                    
                    ))}
                </>
            )}
        </div>
    )
}

export default Known