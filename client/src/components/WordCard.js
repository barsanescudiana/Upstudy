import { useState } from "react"
import uuid from "react-uuid"

const WordCard = (props) => {

    const [element, ] = useState(props.word)

    return (
        <div key={element._id} className='row'> 
            <div id={uuid()} className='word-card rounded bg-light m-2 p-2 col'>
                <h5 className='text-dark col'> ✔️ {element.base} ▪ {element.target} 
                    <span id={uuid()} className='col p-0 text-light badge bg-secondary m-1 p-2 rounded-pill'> 🥇 {element.points} </span> 
                </h5>
                <button 
                    type='submit'
                    className='btn btn-outline-danger'
                    onClick={(e) => {props.handleDeleteWord(e, element)}}>
                        Delete word
                </button>
            </div>
        </div> )
}

export default WordCard