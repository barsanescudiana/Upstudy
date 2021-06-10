import { useState } from "react"
import uuid from 'react-uuid'
import User from "../components/User"

const AllWords = (props) => {

    const [words, setWords] = useState(props.location.state.words)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    
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