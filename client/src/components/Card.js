import react, { useState } from 'react'
import './Card.scss'

const Card = (props) => {
    const [word, setWord] = useState(props.word)
    const [clicked, isClicked] = useState(props.isClicked)
    console.log(word.base)

    const handleClick = (e) => {
        e.preventDefault()
        isClicked(!clicked)
    }

    return (
        <>
        { clicked ? (
            <div 
                className="card d-flex stretched-link flex-column justify-content-center align-items-center 
                            text-dark bg-light mb-2" 
                onClick={(e) => handleClick(e)}>
                <div className="card-body" >
                    <h5 className="card-title">{word.base}</h5>
                    
                </div>
            </div>
        ) : (
            <div 
                className="card d-flex stretched-link flex-column justify-content-center align-items-center 
                            text-white bg-primary mb-2" 
                onClick={(e) => handleClick(e)}>
                <div className="card-body" >
                    <h5 className="card-title">{word.target}</h5>
                </div>
            </div>
        )}
       </>
    )
}

export default Card