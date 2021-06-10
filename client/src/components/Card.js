import { useState } from 'react'
import './Card.scss'

const Card = (props) => {
    const [word, setWord] = useState(props.word)
    const [clicked, isClicked] = useState(props.isClicked)

    const handleClick = (e) => {
        e.preventDefault()
        isClicked(!clicked)
    }

    const handleListen = (e) => {
        e.preventDefault()
        if(clicked) {
            let utterance = new SpeechSynthesisUtterance(word.base);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        } else {
            let utterance = new SpeechSynthesisUtterance(word.target);
            utterance.lang = 'es-ES';
            speechSynthesis.speak(utterance);
        }

    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <>
            { clicked ? (
                <div 
                    id='clicked-card'
                    className="card d-flex stretched-link flex-column justify-content-center align-items-center 
                                text-dark bg-light m-2" 
                    onClick={(e) => handleClick(e)}>
                    <div className="card-body" >
                        <h5 className="card-title">{word.base}</h5>
                        
                    </div>

                </div>
                
            ) : (
                <div
                    id='unclicked-card' 
                    className="card d-flex stretched-link flex-column justify-content-center align-items-center 
                                text-white bg-primary m-2" 
                    onClick={(e) => handleClick(e)}>
                    <div className="card-body" >
                        <h5 className="card-title">{word.target}</h5>
                    </div>
                </div>
            )}
            <button
                type='button'
                className='btn btn-sm w-50'
                onClick={(e) => handleListen(e)}> 
            🔊 </button>
        </>
       </div>
    )
}

export default Card