import {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import {server} from '../pages/GlobalVariables'
import Form from 'react-bootstrap/Form'
import '../App.scss'

const WordTest = (props) => {
    const [words, setWords] = useState(props.words)
    const [flag, setFlag] = useState(0)
    const [word, setWord] = useState(words[flag])
    const [learning, setLearning] = useState(props.learning)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    let [points, setPoints] = useState(0)
    const [progress, setProgress] = useState(0)
    const history = useHistory()

    const handleListen = (e) => {
        e.preventDefault()
        e.target.innerText = '🔊'
        let utterance = new SpeechSynthesisUtterance(document.getElementById('test-label').innerText);
        utterance.lang = 'es-ES';
        speechSynthesis.speak(utterance);
        setTimeout(() => e.target.innerText = '🔈', 2000)
    }

    const genrRandom = (last) => {
        let random
        if(last === undefined) {
            random = words.length;
        }
        do {
            random = Math.floor(Math.random() * (words.length - 1))
        } while (random === last)
        last = random
        return random
    }

    const handleAddNote = (e) => {
        e.preventDefault()
        learning.map((element) => {
            if(element.word === word.base) {
                element.notes += `${document.getElementById('noteTextArea').value} \n`
            }
        })

        document.getElementById('noteTextArea').value = null
    }

    const handleChange = (e) => {
        if(e.target.value === word.base) {
            document.getElementById('test-input').classList.add('border-success', 'outline-success', 'correct')
        } else {
            document.getElementById('test-input').classList.remove('border-success', 'outline-success', 'correct')
        }
    }

    console.log('initial flag', flag)

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



    const handleNext = (e, currentWord) => {
        e.preventDefault()
        console.log('flag', flag)
        setFlag(genrRandom(flag))
        setWord(words[flag])
    }
        

    // useEffect(() => {
    //     if(learning.find(item => item.word === word.base)) setProgress(learning.find(item => item.word === word.base).count)
    // }, [word])

    useEffect(() => {
        words.map(word => {
            points += word.points
        })
        props.points !== 0 ? setPoints(props.points) : setPoints(points) 
    }, [])

    return (
        <div>
            <label 
                htmlFor="progress-range" 
                className="form-label mb-0"> 🏆 You've got this! Keep going  </label>
                <div className='d-flex flex-column justify-contetn-end align-items-end'> 
                    <div className="progress w-100">
                        <div 
                            className="progress-bar-animated progress-bar-striped bg-primary"
                            style={{width: (progress / 3) * 100 + '%'}}
                            role="progressbar" 
                            aria-valuenow={progress} 
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
                    onChange={(e) => handleChange(e)}></Form.Control >
            
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
    )
}

export default WordTest