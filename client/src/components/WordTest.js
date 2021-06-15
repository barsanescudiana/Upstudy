import {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import {server} from '../pages/GlobalVariables'
import '../App.scss'

const WordTest = (props) => {
    const [words, setWords] = useState(props.words)
    const [flag, setFlag] = useState(props.flag)
    const [word, setWord] = useState(words[flag])
    const [learning, setLearning] = useState([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    var [points, setPoints] = useState(0)
    const [progress, setProgress] = useState(0)
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

    const handleNote = (element) => { 
        if(element.notes) {
            axios.post(`${server}/api/user/notes/${word.base}`, {
                notes: element.notes,
                token: user.token
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    const handleNext = (e) => {
        e.preventDefault()
        if(words.length !== 0) {
            setProgress(0)
            if(document.getElementById('test-input').value.toLowerCase() === word.base.toLowerCase()) {
                if(learning.find(element => 
                    element.word === word.base
                )) {
                    learning.forEach(element => {
                    if(element.word === word.base) {
                        element.count++;
                        element.notes += document.getElementById('noteTextArea').value
                        setProgress(element.count)
                        console.log(progress) 
                    }
                    
                    if(element.count === 3) {
                        console.log('count === 3')
                        handleLearn()
                    }
                    })

                } else {
                    learning.push({
                        word: word.base,
                        count: 1,
                        notes: ''
                    })
                }
            }

            setFlag(Math.floor(Math.random() * words.length) !== flag ? Math.floor(Math.random() * words.length) : 0)
            setWord(words[flag])
            document.getElementById('test-input').value = null
            document.getElementById('noteTextArea').value = null

            if(e.target.value === null || document.getElementById('test-input').classList.contains('correct')) {
                document.getElementById('test-input').classList.remove('border-success', 'outline-success', 'correct')
            
            }
        } else {
            setPoints(points)
            console.log(points)
            history.push({
                pathname: '/success',
                state: {
                    points: points
                }
            })
        }
        
    }

    // const handleCharacter = (e, character) => {
    //     e.preventDefault()
    //     document.getElementById('test-input').value += character
    // }

    const handleListen = (e) => {
        e.preventDefault()
        e.target.innerText = '🔊'
        let utterance = new SpeechSynthesisUtterance(document.getElementById('test-label').innerText);
        utterance.lang = 'es-ES';
        speechSynthesis.speak(utterance);
        setTimeout(() => e.target.innerText = '🔈', 1000)
    }

    const handleLearn = () => {
        if (words.length !== 0) {
            learning.forEach(element => {
                if(element.count === 3) {
                    console.log(learning, words)
                    axios.post(`${server}/api/user/learn/${element.word}`, {
                        token: user.token,
                        notes: element.notes,
                        grade: Math.floor(Math.random() * 5)
                    })
                    .then((res) => {
                        console.log(res)
                        words.splice(words.findIndex(found => found.base === element.word), 1)
                        setWords(words)
                        learning.splice(learning.indexOf(element), 1)
                        setLearning(learning)
                        setProgress(0)

                        console.log(words, learning, 'new word learned')


                    }).then(() => {
                        handleNote(element)
                        updateUser()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    
                }
            });
        } 
    }

    const handleAddNote = (e) => {
        e.preventDefault()
        if(learning.length === 0) {
            words.map(element => {
                learning.push({word: element.base, count: 0, notes: ''})
            })
        }
        learning.map((element) => {
            if(element.word === word.base) {
                element.notes += `${document.getElementById('noteTextArea').value} \n`
            }
        })

        document.getElementById('noteTextArea').value = null
    }

    useEffect(() => {
        updateUser()
        words.map(word => {
            points += word.points
        })
        props.points !== 0 ? setPoints(props.points) : setPoints(points) 

        if(words.lenght === 0) {
            history.push({
                pathname: '/success',
                state: {
                    points: points
                }
            })
        }
        
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
                    <div>
                    <input
                        id='test-input'
                        required 
                        type='text'
                        className='form-control'
                        placeholder='Write the correct translation'
                        onChange={(e) => {
                            if(e.target.value === word.base) {
                                document.getElementById('test-input').classList.add('border-success', 'outline-success', 'correct')
                            } else {
                                document.getElementById('test-input').classList.remove('border-success', 'outline-success', 'correct')
                            }
                        }}></input>
                </div>
                    {/* <div id='characters' className='d-flex flex-row m-1 align-items-center justify-content-center'>
                        <button
                            type='button'
                            className='btn btn-outline-primary btn-sm m-1'
                            onClick={(e) => {
                                handleCharacter(e, 'á')
                        }}> á </button>

                        <button
                            type='button'
                            className='btn btn-outline-primary btn-sm m-1'
                            onClick={(e) => {
                                handleCharacter(e, 'é')
                        }}> é </button>

                        <button
                            type='button'
                            className='btn btn-outline-primary btn-sm m-1'
                            onClick={(e) => {
                                handleCharacter(e, 'í')
                        }}> í </button>

                        <button
                            type='button'
                            className='btn btn-outline-primary btn-sm m-1'
                            onClick={(e) => {
                                handleCharacter(e, 'ó')
                        }}> ó </button>
                    </div> */}
            <div className='mt-3 mb-3'>
                <label htmlFor="noteTextArea" className="form-label font-weight-light"> ✏️ Type your note here</label>
                <textarea className="form-control text-wrap" id="noteTextArea" rows="4"></textarea>
                <button 
                    type='button'
                    className='btn btn-outline-primary btn-sm mt-2 rounded'
                    onClick={(e) => {handleAddNote(e)}}> Add note</button>
            </div>
            <button
                type='submit'
                className='btn btn-primary m-2'
                onClick={(e) => handleNext(e)}> Next </button>
            {/* <button
                type='submit'
                className='btn btn-primary m-2'
                onClick={(e) =>{ 
                    setPoints(points)
                    console.log(points)
                    history.push({
                        pathname: '/success',
                        state: {
                            points: points
                        }
                    })}}> 
                Skip to finish </button> */}
        </div>
    )
}

export default WordTest