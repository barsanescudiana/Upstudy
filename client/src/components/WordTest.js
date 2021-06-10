import {useState, useEffect} from 'react'
import axios from 'axios'
import {server} from '../pages/GlobalVariables'
import '../App.scss'

const WordTest = (props) => {
    const [words, setWords] = useState(props.words)
    const [flag, setFlag] = useState(props.flag)
    const [word, setWord] = useState(words[flag])
    const [learning, setLearning] = useState([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

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

    const handleNext = (e) => {
        e.preventDefault()
        if(document.getElementById('test-input').value.toLowerCase() === word.base.toLowerCase()) {
            if(learning.find(element => 
                element.word === word.base
            )) {
                learning.forEach(element => {
                if(element.word === word.base) {
                    element.count++;
                    element.notes += document.getElementById('noteTextArea').value 
                }
                
                if(element.count === 3) {
                    console.log('count === 3')
                    handleLearn()
                    setFlag(Math.floor(Math.random() * words.length) !== flag ? Math.floor(Math.random() * words.length) : 0)
                    setWord(words[flag])
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
        
    }

    const handleCharacter = (e, character) => {
        e.preventDefault()
        document.getElementById('test-input').value += character
    }

    const handleListen = (e) => {
        e.preventDefault()
        e.target.innerText = '🔊'
        let utterance = new SpeechSynthesisUtterance(document.getElementById('test-label').innerText);
        utterance.lang = 'es-ES';
        speechSynthesis.speak(utterance);
        setTimeout(() => e.target.innerText = '🔈', 1000)
    }

    const handleLearn = () => {
        learning.forEach(element => {
            if(element.count === 3) {
            
                axios.post(`${server}/api/user/learn/${element.word}`, {
                    token: user.token,
                    notes: element.notes
                })
                .then((res) => {
                    console.log(res)
                }).then((result) => {
                    handleNote(element)
                    updateUser()
                })
                .catch((err) => {
                    console.log(err)
                })
                
            }

            words.pop(words.find(found => found.base === element.word))
            learning.pop(element)
        });
        
    }

    const handleAddNote = (e) => {
        e.preventDefault()
        if(learning.length === 0) {
            words.map((element) => {
                learning.push({word: element.base, count: 0, notes: ''})
            })
        }
        learning.map((element) => {
            if(element.word === word.base) {
                element.notes += `${document.getElementById('noteTextArea').value} \n`
            }
        })

        document.getElementById('noteTextArea').value = null
        console.log(learning)
    }

    useEffect(() => {
        updateUser()
        learning.map((element) => {
            if(element.count === 3) {
                handleLearn()
                console.log('new word learned')
            }
        })
    }, [])

    

    return (
        <div>
            
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
        </div>
    )
}

export default WordTest