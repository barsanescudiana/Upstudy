import { useState } from "react"
import uuid from "react-uuid"

const ButtonGroup = (props) => {

    NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;
    const [question, ] = useState(props.question)
    const handleAnswer = props.handleAnswer
    const validateAnswerRowOne = (e) => {    
        e.preventDefault()   
        if(e.target.value === 'true') {
            document.getElementById(e.target.id).classList.remove('btn-outline-dark')
            document.getElementById(e.target.id).classList.add('btn-outline-success', 'disabled')
            console.log('correct')
        } else if (e.target.value === 'false'){
            document.getElementById(e.target.id).classList.remove('btn-outline-dark')
            document.getElementById(e.target.id).classList.add('btn-outline-danger', 'disabled')
            console.log('wrong')
        }

        if(document.getElementById(e.target.id).previousSibling) {
            document.getElementById(e.target.id).previousSibling.classList.add('disabled')
            if(document.getElementById(e.target.id).previousSibling.value === 'true') {
                document.getElementById(e.target.id).previousSibling.classList.remove('btn-outline-dark')
                document.getElementById(e.target.id).previousSibling.classList.add('btn-outline-success')
            } 

        }  
        if(document.getElementById(e.target.id).nextSibling) {
            if(document.getElementById(e.target.id).nextSibling.value === 'true') {
                document.getElementById(e.target.id).nextSibling.classList.remove('btn-outline-dark')
                document.getElementById(e.target.id).nextSibling.classList.add('btn-outline-success')
            } 
            document.getElementById(e.target.id).nextSibling.classList.add('disabled')
        } 
        if(document.getElementById(e.target.id).parentElement) {
            document.getElementById(e.target.id).parentElement.nextElementSibling.children.forEach(child => {
                if(child.value === 'true') {
                    child.classList.remove('btn-outline-dark')
                    child.classList.add('btn-outline-success')
                }
                child.classList.add('disabled')
            })
        }
    }
        
    const validateAnswerRowTwo = (e) => {    
        e.preventDefault()   
        if(e.target.value === 'true') {
            document.getElementById(e.target.id).classList.remove('btn-outline-dark')
            document.getElementById(e.target.id).classList.add('btn-outline-success', 'disabled')
            console.log('correct')
        } else if (e.target.value === 'false'){
            document.getElementById(e.target.id).classList.remove('btn-outline-dark')
            document.getElementById(e.target.id).classList.add('btn-outline-danger', 'disabled')
            console.log('wrong')
        }

        if(document.getElementById(e.target.id).previousSibling) {
            document.getElementById(e.target.id).previousSibling.classList.add('disabled')
            if(document.getElementById(e.target.id).previousSibling.value === 'true') {
                document.getElementById(e.target.id).previousSibling.classList.remove('btn-outline-dark')
                document.getElementById(e.target.id).previousSibling.classList.add('btn-outline-success')
            } 

        }  
        if(document.getElementById(e.target.id).nextSibling) {
            if(document.getElementById(e.target.id).nextSibling.value === 'true') {
                document.getElementById(e.target.id).nextSibling.classList.remove('btn-outline-dark')
                document.getElementById(e.target.id).nextSibling.classList.add('btn-outline-success')
            } 
            document.getElementById(e.target.id).nextSibling.classList.add('disabled')
        } 

        if(document.getElementById(e.target.id).parentElement) {
            document.getElementById(e.target.id).parentElement.previousElementSibling.children.forEach(child => {
                if(child.value === 'true') {
                    child.classList.remove('btn-outline-dark')
                    child.classList.add('btn-outline-success')
                }
                child.classList.add('disabled')
            })
        }
    }

    return (
        <div> 
            <div id={uuid()} className='row m-1'> 
                <button id={uuid()}
                onClick={(e) => {
                    handleAnswer(e, question.answers[1].text)
                    validateAnswerRowOne(e)}}  
                className='col btn btn-outline-dark m-1'
                value = {question.answers[1].correct}>
                    {question.answers[1].text}
                </button>
                
                <button id={uuid()} 
                onClick={(e) => {
                    handleAnswer(e, question.answers[0].text)
                    validateAnswerRowOne(e)}}  
                className='col btn btn-outline-dark m-1'
                value = {question.answers[0].correct}>
                    {question.answers[0].text}
                </button>
            </div>

            <div id={uuid()} className='row m-1'> 
                             <button id={uuid()}
                onClick={(e) => {
                    handleAnswer(e, question.answers[3].text)
                    validateAnswerRowTwo(e)}}  
                className='col btn btn-outline-dark m-1'
                value = {question.answers[3].correct}>
                    {question.answers[3].text}
                </button>
                
                <button id={uuid()} 
                onClick={(e) => {
                    handleAnswer(e, question.answers[2].text)
                    validateAnswerRowTwo(e)}}  
                className='col btn btn-outline-dark m-1'
                value = {question.answers[2].correct}>
                    {question.answers[2].text}
                </button>

            </div> 
     
        </div>
    )
}

export default ButtonGroup