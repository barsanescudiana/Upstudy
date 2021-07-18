import {useEffect, useState} from 'react'
import { useHistory} from 'react-router'
import axios from 'axios'
import {server} from '../pages/GlobalVariables'
import uuid from 'react-uuid'

const Tests = (props) => {
    const [user, setUser] =  useState(props.user)
    const [taken, setTaken] = useState(props.tests)
    const history = useHistory()

    const handleRetake = (e) => {
       
        axios.get(`${server}/api/tests/test/${e.target.value}`)
        .then((res) => {
            localStorage.setItem('test', JSON.stringify(res.data[0]))
        })
        .catch(err => {
            console.error(err)
        })
        setTimeout(() => { 
            history.push(`/reading/${e.target.value}`)
                
        }, 500)
    }

    const handleView = (e) => {
        e.preventDefault()
        history.push('/test')
    } 


    return (
        <>
        <button
            className='btn btn-primary mb-1'
            onClick={(e) => handleView(e)} > 📝 View available tests </button>
        { taken.length !== 0 ? (
            taken.map(test => (
                <div key={uuid()} className='bg-light text-dark rounded p-3 m-3'> 
                    {test.level === 'beginner' ? (
                        <h4 className='text-primary'> 📝 {test.title} <span className='badge rounded-pill bg-success text-dark p-2 m-1'> 🥉 {test.level} </span> </h4>
                    ) : test.level === 'intermediate' ? (
                        <h4 className='text-primary'> {test.title} <span className='badge rounded-pill bg-info text-light p-2 m-1'> 🥈 {test.level} </span> </h4>
                    ) : (
                        <h4 className='text-primary'> {test.title} <span className='badge rounded-pill bg-warning text-dark p-2 m-1'> 🥇 {test.level} </span> </h4>
                    )}
                    
                    <h5 className=' m-1 p-1'> {test.grade > 50 ? '🔓 Grade: ' : '🔒 Grade: '}<span className={test.grade > 50 ? 'text-success' : 'text-danger'} > {test.grade}</span>/100 </h5>
                    <button
                    data-toggle="modal" 
                    data-target="#exampleModalCenter"
                    value={test.title} 
                    className='btn btn-outline-secondary'
                    onClick={(e) => handleRetake(e)}> Retake test </button>
                </div>
            ))
            ) : (
                <div className='h4 mt-2 text-center'> 
                    Taken tests will appear on this page! Start evaluating your knowledge <a href='/test' onClick={(e) => {handleView(e)}}> here</a>! 
                </div>
            )
        }
        </>

    )
}

export default Tests