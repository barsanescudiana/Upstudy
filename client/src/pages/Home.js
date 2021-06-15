import axios from "axios"
import { useEffect, useState, setState } from "react"
import { server } from './GlobalVariables'
import Login from "./Login"
import Card from '../components/Card'
import uuid from "react-uuid";
import { useHistory } from "react-router"
import Form from 'react-bootstrap/Form'

const Home = () => {

    const [user, setUser] = useState('')
    const [words, setWords] = useState([])
    const history = useHistory()
    const [allWords, setAllWords] = useState([])
    const [admins, setAdmins] = useState([])
    const [users, setUsers] = useState([])

    const [base, setBase] = useState('')
    const [target, setTarget] = useState('')
    const [points, setPoints] = useState('')

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
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

    useEffect( () => {

        axios.get(`${server}/api/words/`)
        .then((res) => {
            setAllWords(res.data)
        })
        .catch((err) => {
            console.error(err)
        })

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

    

    return (
        <div className='containder-fluid d-grid orientation-vertical'>  
        {user ? (
            <>
            { user.role === 'user' ? (
                <>
                    <div className='row position-relative p-3'>
                        <div className='row'> Welcome,
                            <h3> {user.name} <span> </span>
                                <span className="badge rounded-pill bg-light text-primary"> 🥇 {user.score} points </span>
                            </h3>
                        </div>
                        <div className='row-ml'>
                            <button 
                                type="button" 
                                className="col btn btn-outline-primary"
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
                <>
                    <div key={uuid()} className='d-grid position-relative p-3'>
                        <div className='row'>
                            <div className='col'> Welcome,
                                <h3> {user.name} <span> </span>
                                    <span className="badge rounded-pill bg-light text-primary"> 📚 {allWords.length} words stored </span>
                                </h3>
                            </div>
                            <div className='col-ml'>
                                <button 
                                    type="button" 
                                    className="col btn btn-outline-primary me-2"
                                    onClick={(e) => {
                                        handleAddWords(e, user.email)
                                    }}>
                                    ⚙️ Add new word
                                </button>
                                <button 
                                    type="button" 
                                    className="col btn btn-outline-primary m-2 ms-0"
                                    onClick={(e) => {
                                        handleViewWords(e)
                                    }}>
                                    🏷️ View all words
                                </button>
                                <button 
                                    type='button'
                                    className='col btn btn-light btn-sm rounded m-1'
                                    onClick={(e) => {
                                        handleLogOut(e)
                                    }}>
                                    ⚙️ Log out
                                </button>
                                <button 
                                    type='button'
                                    className='col btn btn-danger btn-sm text-light rounded m-1'
                                    onClick={(e) => {
                                        handleDeleteCurrent(e, user)
                                    }}>
                                    ⚙️ Delete account
                                </button>
                            </div>
                        </div>
                        <div hey={uuid()} className='row d-flex flex-row justify-content-center flex-wrap mt-4'>
                            <div className='col m-2'
                                style={{maxWidth: 550 + 'px'}}>
                                {
                                    
                                    admins.map((user) => (
                                         <div id={uuid()} 
                                            className='container-fluid bg-light text-dark rounded p-4 m-2'
                                            style={{maxWidth: 550 + 'px'}}>
                                                <h4 className='col'> ⚙️ {user.name} <span> </span>
                                                        <span className="badge rounded-pill bg-warning text-dark"> 🕵️ {user.role} </span>
                                                </h4>
                                                <div className='row'> 
                                                    <span className='col'> 📮 {user.email} </span>
                                                </div>
                                                <div className='row'> 
                                                    <span className='col text-dark'> 📅 <span> </span>
                                                        <span className='text-primary font-weight-large'>
                                                            {new Date(user.date).toDateString()} 
                                                        </span> 
                                                    </span>
                                                </div>
                                                <div className='row'>
                                                    <button 
                                                        className='btn btn-sm btn-outline-info col m-2 me-1'
                                                        
                                                        onClick={(e) => {handleMakeUser(e, user)}}> 
                                                        Make user
                                                    </button>
                                                </div> 
                                            </div>  
                                    ))
                                }
                                {
                                    users.map((user) => (
                                        <div id={uuid()} 
                                            className='container-fluid d-grid bg-light text-dark rounded p-4 m-2'
                                            style={{maxWidth: 550 + 'px'}}>
                                            <h4 className='col'> 🧠 {user.name} <span> </span>
                                                    <span className="badge rounded-pill bg-primary text-light"> 🥇 {user.score} points </span>
                                            </h4>
                                            <div className='row'> 
                                                <span className='col'> 📮 {user.email} <br/> 📚 {user.knownWords.length} words learned<br/>
                                                    <span className='col text-dark'> 📅 <span> </span>
                                                        <span className='text-primary'> 
                                                            {new Date(user.date).toDateString()} 
                                                        </span> 
                                                    </span>
                                                </span>
                                                <div className='row mt-2'>
                                                    <button 
                                                        className='btn btn-sm btn-outline-danger col ms-4 m-2 me-1'
                                                        onClick={(e) => {handleDelete(e, user)}}> 
                                                        Remove user
                                                    </button>
                                                    <button 
                                                        className='btn btn-sm btn-outline-warning col m-2 me-1'
                                                        onClick={(e) => {handleAdmin(e, user)}}> 
                                                        Make admin
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }                 
                                               
                            </div>

                        <Form 
                            id='add-form'
                            style={{visibility: 'hidden', maxWidth: 300 + 'px'}}
                            className='col m-2 p-4'>
                            <h4> Add a new word </h4>    
                            <div className='user-wrapper d-flex flex-column form-floating mb-3'>
                                <Form.Control 
                                    as='input'
                                    required
                                    type='text' 
                                    className='form-control' 
                                    id='base-input' 
                                    placeholder='Name'
                                    onChange={(e) => {
                                        setBase(e.target.value)
                                    }}/>
                                <label htmlFor="base-input">Base word</label>
                            </div>
                            <div className='email-wrapper d-flex flex-column form-floating mb-3'>
                                <Form.Control 
                                    as='input'
                                    required
                                    type='text' 
                                    className='form-control' 
                                    id='target-input' 
                                    placeholder='name@example.com'
                                    onChange={(e) => {
                                        setTarget(e.target.value)
                                    }}/>
                                <label htmlFor="target-input">Target word</label>
                            </div>
                            <div className='pass-wrapper form-floating mb-3'>
                                <Form.Control 
                                    required
                                    readOnly
                                    as='input'
                                    type='number' 
                                    className='form-control' 
                                    id='points-input'
                                    value={allWords.length + 1}
                                    onChange={(e) => {
                                        setPoints(e.target.value)
                                        
                                    }}/>
                                <label htmlFor="points-input">Points</label>
                            </div>
                            <button className='btn btn-primary'
                            type='submit'
                            onClick={(e) => {
                                handleSubmit(e)
                            }}> Insert </button>
                        </Form>
                    </div>
                    </div>
                </>
                
            )}
               
        </>
        ) : (
            <Login/>
        )}
        </div>
    )
}

export default Home