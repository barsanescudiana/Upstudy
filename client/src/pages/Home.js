import axios from "axios"
import { useEffect, useState, setState, useCallback } from "react"
import { server } from './GlobalVariables'
import Landing from "./Landing"
import Card from '../components/Card'
import uuid from "react-uuid";
import { useHistory } from "react-router"
import Form from 'react-bootstrap/Form'
import AdminBoard from "../components/AdminBoard"

const Home = () => {

    const [user, setUser] = useState('')
    const [words, setWords] = useState([])
    const history = useHistory()
    const [allWords, setAllWords] = useState([])
    const [admins, setAdmins] = useState([])
    const [users, setUsers] = useState([])

    const [base, setBase] = useState('')
    const [target, setTarget] = useState('')
    const [points, setPoints] = useState(0)

    const current = new Date()
    const [tests, setTests] = useState([])

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);

        axios.get(`${server}/api/user/tests/${foundUser.email}`)
        .then((res) => {
            setTests(res.data)
        })
        .catch(err => {
            console.error(err)
        })
        }

        
    }, []);

    const handleCards = (e, userEmail) => {
        e.preventDefault()
        axios.get(`${server}/api/words/random/${userEmail}`)
        .then((words) => {
            setWords(words.data)
        })
        .catch((err) => {
            console.log(err)
        })
        setTimeout(() => document.getElementById('learn-btn').style.visibility = 'visible', 2000)
    }

    const handleAddWords = (e) => {
        e.preventDefault()
        document.getElementById('add-form').style.visibility === 'hidden' 
            ?  document.getElementById('add-form').style.visibility = 'visible' 
            :  document.getElementById('add-form').style.visibility = 'hidden'
        
        if(document.getElementById('add-form').style.visibility === 'visible') {
            setPoints(document.getElementById('points-input').value)
            e.target.innerText = '⚙️ Hide add form'
        } else {
            e.target.innerText = '⚙️ Add new word'
        }
    }

    const handleViewProfile = (e) => {
        e.preventDefault()
        history.push('/profile')
    } 

    const handleLearning = (e) => {
        e.preventDefault()
        history.push({
            pathname: '/learn',
            state: { 
                words: words,
                user: user
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPoints(document.getElementById('points-input').value)
        axios.post(`${server}/api/words/new`, {
            base: base,
            target: target,
            points: points
        }).then((res) => {
            setAllWords(res.data.words)
        }).catch((err) => {
            console.error(err)
        })

        document.getElementById('base-input').value = null
        document.getElementById('target-input').value = null
        document.getElementById('points-input').value = null

        history.push('/words')
        history.push('/')
    }

    const handleViewWords = (e) => {
        e.preventDefault()
        history.push({
            pathname: '/words',
            state: {
                words: allWords
            }
        })
    }

    const handleLogOut = (e) => {
        localStorage.removeItem('user')
        history.push('/login')
    }

    const handleDelete = (e, user) => {
        e.preventDefault()
        axios.post(`${server}/api/user/delete`, {
            email: user.email
        }).then((res) => {
                setAdmins(res.data.filter(user => user.role === 'admin' && user.email !== JSON.parse(localStorage.getItem('user')).email))
                setUsers(res.data.filter(user => user.role === 'user'))
        }).catch((err) => {
            console.error(err)
        })

        axios.get(`${server}/api/user`)
        .then((res) => {
                setAdmins(res.data.filter(user => user.role === 'admin' && user.email !== JSON.parse(localStorage.getItem('user')).email))
                setUsers(res.data.filter(user => user.role === 'user'))
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const handleDeleteCurrent = (e, user) => {
        e.preventDefault()
        axios.post(`${server}/api/user/delete`, {
            email: user.email
        }).then((res) => {
                setAdmins(res.data.filter(user => user.role === 'admin' && user.email !== JSON.parse(localStorage.getItem('user')).email))
                setUsers(res.data.filter(user => user.role === 'user'))
        }).catch((err) => {
            console.error(err)
        })

        localStorage.removeItem('user')
        history.push('/login')
    }

    const handleAdmin = (e, user) => {
        e.preventDefault()
        axios.post(`${server}/api/user/admin`, {
            email: user.email
        })
        .then((res) => {
                setAdmins(res.data.filter(user => user.role === 'admin' && user.email !== JSON.parse(localStorage.getItem('user')).email))
                setUsers(res.data.filter(user => user.role === 'user'))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleMakeUser = (e, user) => {
        e.preventDefault()
        axios.post(`${server}/api/user/user`, {
            email: user.email
        })
        .then((res) => {
                setAdmins(res.data.filter(user => user.role === 'admin' && user.email !== JSON.parse(localStorage.getItem('user')).email))
                setUsers(res.data.filter(user => user.role === 'user'))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleTest = (e) => {
        e.preventDefault()
        history.push('/test')
    }

    const handleRevision = (e) => {
        e.preventDefault()
        history.push('/revision')
    }

    useEffect(() => {
        axios.get(`${server}/api/words/`)
        .then((res) => {
            setAllWords(res.data)
        })
        .catch((err) => {
            console.error(err)
        })

        if(localStorage.getItem('user'))
        axios.get(`${server}/api/user`)
        .then(res => {
                setAdmins(res.data.filter(user => user.role === 'admin' && user.email !== JSON.parse(localStorage.getItem('user')).email))
                setUsers(res.data.filter(user => user.role === 'user'))
            }
        )
        .catch((err) => {
            console.error(err)
        })

    }, [])


    const handleBaseChange = useCallback((e) => {
        setBase(e.target.value)
    }, [base])


    const handleTargetChange = useCallback((e) => {
        setTarget(e.target.value)
    }, [target])
    

    return (
        <div className='containder-fluid d-grid orientation-vertical'>  
        {user ? (
            <>
            <button 
                type='button'
                className='col btn btn-light rounded position-absolute end-0 top-0 m-3'
                onClick={(e) => {
                    handleLogOut(e)
                }}>
                ⚙️ Log out
            </button>
            { user.role === 'user' ? (
                <>
                    <div className='row position-relative p-3'>
                        <div className='row'> Welcome,
                            <h3> {user.name} <span> </span>
                                <span className="badge rounded-pill bg-light text-primary"> 🥇 {user.score} points </span>
                            </h3>
                        </div>
                        <div className='row m-1'>
                            <button 
                                type="button" 
                                className="col btn btn-outline-primary m-2"
                                onClick={(e) => {
                                    handleCards(e, user.email)
                                }}>
                                ⚙️ Generate cards
                            </button>
                            <button 
                                type="button" 
                                className="col btn btn-outline-primary m-2"
                                onClick={(e) => {
                                    handleViewProfile(e)
                                }}>
                                🏷️ View profile 
                            </button>
                            <button 
                                type="button" 
                                className="col position-relative btn btn-outline-primary m-2"
                                onClick={(e) => {
                                    handleTest(e)
                                }}>
                                📰 Take reading test
                                {tests.length !== 0 ? (
                                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success rounded-pill text-dark word-count">
                                        <strong>{(tests.length > 100 ? '99+' : tests.length) }</strong>
                                        <span className="visually-hidden">Words that need revision</span>
                                    </span>
                                ) : (
                                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-pill text-dark word-count">
                                        <strong>{tests.length}</strong>
                                        <span className="visually-hidden">Words that need revision</span>
                                    </span>
                                )}
                            </button>
                            <button 
                                type="button" 
                                className="col btn btn-outline-primary m-2 position-relative"
                                onClick={(e) => {
                                    handleRevision(e)
                                }}>
                                📅 Revision
                                {user.knownWords.filter(word => new Date(word.dueDate) < current).length !== 0 ? (
                                    <span className ="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-pill text-dark word-count">
                                        <strong>{user.knownWords.filter(word => new Date(word.dueDate) <= current).length > 100 ? '99+' : user.knownWords.filter(word => new Date(word.dueDate) < current).length}</strong>
                                        <span className="visually-hidden">Words that need revision</span>
                                    </span>
                                ) : (
                                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-warning rounded-pill text-dark word-count">
                                        <strong>{user.knownWords.filter(word => new Date(word.dueDate) <= current).length}</strong>
                                        <span className="visually-hidden">Words that need revision</span>
                                    </span>
                                )}

                            </button>



                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-evenly flex-wrap'> 
                    { words.length !== 0 && 
                        words.map((word) => (   
                                <Card key={uuid()} word={word} isClicked={false}/>
                            
                        ))
                    } 
                    </div>
                    <button
                        id='learn-btn'
                        style={{visibility: 'hidden'}}
                        type='button'
                        className='row btn btn-dark m-4'
                        onClick={(e) => {
                            handleLearning(e)
                        }}> 
                            Start learning!
                    </button>
                </>
            ) : (
                <AdminBoard/>
            )}
               
        </>
        ) : (
            <Landing/>
        )}
        </div>
    )
}

export default Home