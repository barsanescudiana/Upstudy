import axios from "axios"
import { useEffect, useState } from "react"
import { server } from './GlobalVariables'
import Login from "./Login"
import Card from '../components/Card'
import uuid from "react-uuid";
import User from "../components/User"

const Home = () => {

    const [user, setUser] = useState('')
    const [words, setWords] = useState([])

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
        }
    }, []);

    const handleCards = (e, userEmail) => {
        e.preventDefault()
        console.log(userEmail)
        axios.get(`${server}/api/words/random/${userEmail}`)
        .then((words) => {
            setWords(words.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='containder-fluid d-grid orientation-vertical float-start position-static'>  
        {user ? (
            <>
            <div className='row row-cols-2 position-relative top-0 start-0 p-5'>
                <div className='col-md'> Welcome,
                    <User user={user}/>
                </div>
                
                <button 
                    type="button" 
                    className="btn btn-outline-primary col-md"
                    onClick={(e) => {
                        handleCards(e, user.email)
                    }}>
                        Generate cards
                </button>
            </div>
                <div className='row container d-grid flex-row justify-content-center align-items-center p-3 overflow-auto'>
                    <div className='row row-cols-1 d-flex justify-content-center'> 
                    { words.length !== 0 && 
                        words.map((word) => (   
                            <div key={uuid()} className='col-l'>   
                                <Card key={uuid()} word={word} isClicked={false}/>
                            </div>
                        ))
                    } 
                    </div>
                </div>
            </>
        ) : (
            <Login/>
        )}
        </div>
    )
}

export default Home