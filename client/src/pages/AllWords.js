import axios from "axios"
import { useState, useEffect } from "react"
import uuid from 'react-uuid'
import User from "../components/User"
import { server } from './GlobalVariables' 

const AllWords = (props) => {

    const [words, setWords] = useState(props.location.state.words)
    const [user, ] = useState(JSON.parse(localStorage.getItem('user')))
    
    const handleDeleteWord = (e, word) => {
        axios.post(`${server}/api/words/delete`, {
            base: word.base
        })
        .then((res) => {
            setWords(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {

    }, [])

    return(
    <>
        <User user={user}></User>
        { words.length === 0 ?  (

            <h4 className='mt-3'>
                No words added in our database! <a
                href='/'
                className='text-primary m-1'> <mark className='rounded text-primary'>  Add words here.  </mark></a>
            </h4> 

        ) : (
            <div className='d-grid'>
                {   
                    words.map(element => ( 
                        <div className='row'> 
                            <div id={uuid()} className='word-card rounded bg-light m-2 p-2 col'>
                                <h5 className='text-dark col'> ✔️ {element.base} ▪ {element.target} 
                                    <span id={uuid()} className='col p-0 text-light badge bg-secondary m-1 p-2 rounded-pill'> 🥇 {element.points} </span> 
                                </h5>
                                <button 
                                    type='submit'
                                    className='btn btn-outline-danger'
                                    onClick={(e) => {handleDeleteWord(e, element)}}>
                                        Delete word
                                </button>
                            </div>
                        </div>
                    )) 
                }
            </div>
        )

        }
    </>
    )
}

export default AllWords