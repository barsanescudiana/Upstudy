import { useState, useEffect } from "react"
import { useHistory } from 'react-router'
import User from "../components/User"
import WordTest from "../components/WordTest"
import axios from 'axios'
import {server} from '../pages/GlobalVariables'
import Form from 'react-bootstrap/Form'


const Learn = (props) => {
    const [words, ] = useState(props.location.state.words)
    const [user, ] = useState(props.location.state.user)
    let [points, setPoints] = useState(0)
    const [learning, setLearning] = useState([])
    const [flag, setFlag]  = useState(words.length - 1)
    const history = useHistory()
    const [word, setWord] = useState(words[0])

    const handleListen = (e) => {
        e.preventDefault()
        e.target.innerText = '🔊'
        let utterance = new SpeechSynthesisUtterance(document.getElementById('test-label').innerText);
        utterance.lang = 'es-ES';
        speechSynthesis.speak(utterance);
        setTimeout(() => e.target.innerText = '🔈', 2000)
    }

    const handleAddNote = (e) => {
        e.preventDefault()
        learning.map((element) => {
            if(element.base === word.base) {
                element.notes += `${document.getElementById('noteTextArea').value} \n`
            }
        })

        document.getElementById('noteTextArea').value = null
    }

    const handleChange = (e) => {
        if(e.target.value === word.base) {
            if(document.getElementById('test-input').classList.contains('border-danger', 'outline-danger', 'is-invalid'))
                document.getElementById('test-input').classList.remove('border-danger', 'outline-danger', 'is-invalid')
            document.getElementById('test-input').classList.add('border-success', 'outline-success', 'correct')
        } else {
            document.getElementById('test-input').classList.remove('border-success', 'outline-success', 'correct')
        }
    }

    const handleNext = (e, currentWord) => {
        e.preventDefault()
        if(learning.length !== 0) {
            if (document.getElementById('test-input').value !== currentWord.base) {
                if(document.getElementById('test-input').classList.contains('border-success', 'outline-success', 'correct'))
                    document.getElementById('test-input').classList.remove('border-success', 'outline-success', 'correct')
                document.getElementById('test-input').classList.add('border-danger', 'outline-danger', 'is-invalid')
            } else {
                learning.find(item => item.base === currentWord.base).count++

                if(learning.find(item=> item.base === currentWord.base).count === 3) {
                    console.log('posttttttt din handlenext', learning.find(item=> item.base === currentWord.base))
                    
                    axios.post(`${server}/api/user/learn/${word.base}`, {
                        token: user.token,
                        notes: learning.find(item => item.base === currentWord.base).notes,
                        grade: Math.floor(Math.random() * 5)
                    })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err)
                    })

                    learning.splice(learning.indexOf(learning.find(item => item.base === currentWord.base)), 1)
                    words.splice(words.indexOf(words.find(item => item.base === currentWord.base)), 1)

                } 

                document.getElementById('test-input').value = null

                let random = Math.floor(Math.random() * (learning.length - 1))
                flag === random ? setFlag(Math.floor(Math.random() * (learning.length))) : setFlag(random)
                setWord(learning[flag])

                document.getElementById('test-input').classList.remove('border-success', 'outline-success', 'correct')
            }
        } else {
            setTimeout(() => {
                history.push({
                    pathname: '/success',
                    state: {
                        points: points
                    }
                })
            }, 1000)
        }
    }

    if(learning.length === 0) {
        words.map(word => {
            learning.push({
                ...word,
                count: 0,
                notes: ''
        
            })
        })
    }

     useEffect(() => {
        words.map(word => {
            points += word.points
        })
        setPoints(points)      
    }, [words])

    return (
        <>
        <button
            type='submit'
            className='btn btn-outline-danger position-absolute m-3 top-0 end-0'
            onClick={(e) => {
                history.push('/')
            }}> <i className="fas fa-times"></i> Exit </button>
        { words.length !== 0 ? (
            <div className='d-flex flex-column mt-5'>
                <div className='row'> Welcome,
                    <User user={user}/>
                </div>            
            <div>
                <label 
                    htmlFor="progress-range" 
                    className="form-label mb-0"> 🏆 You've got this! Keep going  </label>
                    <div className='d-flex flex-column justify-contetn-end align-items-end'> 
                        <div className="progress w-100">
                            <div 
                                className="progress-bar-animated progress-bar-striped bg-primary"
                                style={{width: (learning.find(item => item.base === word.base).count / 3) * 100 + '%'}}
                                role="progressbar" 
                                aria-valuenow={learning.find(item => item.base === word.base).count} 
                                aria-valuemin="0" 
                                aria-valuemax="3">    
                            </div>
                        </div>
                    </div>
                <div className='vertical-align-center d-flex flex-row mb-1'>
                    <label 
                        id='test-label'
                        htmlFor="test-input" 
                        className="form-label text-capitalize font-weight-bold text-primary mb-0"> 
                        {word.target} 
                    </label>
                    <button 
                        type='button'
                        className='btn btn-sm m-2'
                        onClick={(e) => handleListen(e)}> 🔈 
                    </button>
                </div>
                <Form> 
                    <Form.Control 
                        as='input'
                        id='test-input'
                        required 
                        type='text'
                        className='form-control'
                        placeholder='Write the correct translation'
                        onChange={(e) => handleChange(e)}>

                        </Form.Control >

                        <div className="invalid-feedback">
                            Please write the correct translation 
                        </div>
                
                    <div className='mt-3 mb-3'>
                        <label htmlFor="noteTextArea" className="form-label font-weight-light"> ✏️ Type your note here</label>
                        <Form.Control
                            as='textarea'  
                            className="form-control text-wrap" 
                            id="noteTextArea" 
                            rows="4"></Form.Control >
                        <button 
                            type='button'
                            className='btn btn-outline-primary btn-sm mt-2 rounded'
                            onClick={(e) => handleAddNote(e)}> Add note</button>
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary'
                        onClick={(e) => handleNext(e, word)}> Next </button >
                </Form>
            </div>
            </div>
        ) : (
            <>
            { history.push({
                pathname: '/success',
                state: {
                    points: points
                }
            })}
            </>
        )}
        </>
    )
}

export default Learn