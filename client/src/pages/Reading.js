import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import uuid from "react-uuid"
import ButtonGroup from "../components/ButtonGroup"
import {server} from './GlobalVariables'
// import { Modal } from 'bootstrap/dist/js/bootstrap.esm'
import Modal from 'bootstrap/js/dist/modal';

const Reading = (props) => {

    const [test, setTest] = useState(JSON.parse(localStorage.getItem('test')))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [score, setScore] = useState(0)
    const [progress, setProgress] = useState(0)
    const history = useHistory()

    const handleAnswer = (e, text) => {
        e.preventDefault()
        setProgress(progress+1)
        if(e.target.value === "true") setScore(score+20)
        console.log(score)

    }

    const handleModalClick = (e) => {
        if(e.target.innerText === 'Save changes') {
            axios.post(`${server}/api/user/test`, {
                title: test.title, 
                token: user.token, 
                grade: score
            }).then((res) => {
                
            }).catch((err) => {
                console.log(err)
            })
            
            axios.get(`${server}/api/user/${user.email}`)
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data))
                setUser(res.data)
            })
            .catch(err => {
                console.err(err)
            })

            localStorage.removeItem('test')
            history.push('/')

        } else {
            history.push('/')
            setTimeout(() => {history.push(`/reading/${test.title}`)}, 100)
            
        }
    }

    useEffect(() => {
        setTest(JSON.parse(localStorage.getItem('test')))
    }, [localStorage.getItem('test')])

    return(
        <div>

           <button
                type='submit'
                className='btn btn-sm btn-outline-danger position-absolute m-3 top-0 end-0'
                onClick={(e) => {
                    history.push('/')
                }}> <i className="fas fa-times"></i> Exit </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"> 🏆 Congratulations, {user.name}! </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p className='text-center'>
                        <h3>  You answered all our questions! 🏁 </h3>
                        <h5> Your grade </h5>
                        <h1><div className={'' + (score > 50 ?  'badge rounded-pill bg-success text-dark' : 'badge rounded-pill bg-danger text-light')}> {score} </div></h1>
                        <span> <strong>out of 100</strong></span>
                        <br/><span className='text-italic'> {score > 50 ? `Try taking another test to see where you're at!` : 'Keep learning new words in order to do better! '} </span>
                    </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={(e) => {handleModalClick(e)}}>{ score > 50 ? 'Save changes' : 'Retake'}</button>
                </div>
                </div>
            </div>
            </div>

            { test ? (
                <div className='d-grid align-items-center'>
                    <label htmlFor="progress-range" 
                        className="form-label mb-0"> 🏆 Total questions answered: {progress}/5  </label>
                    <div className='row progress w-100 mb-3'>
                        
                        <div 
                            className="progress-bar-animated progress-bar-striped bg-primary"
                            style={{width: (progress / 5) * 100 + '%'}}
                            role="progressbar" 
                            aria-valuenow={progress} 
                            aria-valuemin="0" 
                            aria-valuemax="5">    
                        </div>
                    </div> 
                    <div className='row'>
                        <p className= 'col text'>
                            <span className='title h4 text-primary text-justify'> {test.title} <span className='badge rounded-pill bg-light text-dark'>Level - {test.level}</span></span>
                            <br/><br/>
                            {test.text}
                            <br/>
                            <button
                            data-bs-toggle="modal" data-bs-target="#exampleModal" id='modal-btn' 
                            className={progress === 5 ? 'btn btn-primary mt-3' : 'btn btn-outline-primary mt-3 disabled'}> 
                            Submit test </button> 
                        </p>

                        <div className='col bg-light p-3 ps-5 pe-5 rounded'>
                            { test.questions.map( question => ( 
                                <>
                                    <div key={uuid()} className='question row mt-2 text-primary h4'> <span className='badge rounded-pill bg-warning text-dark mb-2 mt-3'> Question {test.questions.indexOf(question) + 1} </span> {question.question} </div> 
                                    <ButtonGroup question={question} handleAnswer={handleAnswer} score={score} setScore={setScore}/>
                                </>
                            ))}                            
                        </div>
                    </div>
                </div>
                ) : (
                    <div> No test </div>
                )}
        </div>
       
    )
}

export default Reading