import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import {server} from './GlobalVariables'
import axios from 'axios'

const Test = () => {

    const [tests, setTests] = useState([])
    const [user, ] = useState(JSON.parse(localStorage.getItem('user')))
    const history = useHistory()

    const handleClick = (e, title) => {
        e.preventDefault()
        tests.map((item) => {
            if(item.title === title) {
                localStorage.setItem('test', JSON.stringify(item))
                setTimeout(() => {history.push(`/reading/${title}`)}, 500)
            }
        })

    }

    const showTests = () => {
        tests.map((item) => {
        let id = `row-level-${item.level}`
        const btn = document.createElement('button')
        btn.classList.add('btn', 'btn-outline-primary', 'm-2', 'col-4', 'test-btn', 'mb-4', 'font-weight-bold', 'text-wrap')
        btn.innerText = item.title
        btn.addEventListener('click', (e) => {
            handleClick(e, item.title)
        }) 
        btn.innerText = item.title
        document.getElementById(id).appendChild(btn)
        document.getElementById('btn-show').style.visibility = 'hidden'
        })
    }

    useEffect(() => {
        axios.get(`${server}/api/user/tests/${user.email}`)
        .then((res) => {
            setTests(res.data)
        })
        .catch((err) => {
            console.log(err)
        })

    }, [])

    return(
        <>
        <button
                type='submit'
                className='btn btn-dark position-absolute m-3 top-0 end-0'
                onClick={(e) => {
                    history.push('/')
                }}> Quit </button>
        { tests.length !== 0 ? (
            <div className='d-grid'> 
                <div className='row'>
                    <h3> Choose the test you want to take</h3>
                </div>
                <div className='row' id='row-level-beginner'> 
                    <h4 className='text-primary'> 🥉 Beginner </h4>
                </div>
                <div className='row' id='row-level-intermediate'> 
                    <h4 className='text-primary'> 🥈 Intermediate </h4>
                </div>
                <div className='row' id='row-level-advanced'> 
                    <h4 className='text-primary'> 🥇 Advanced </h4>
                </div>

                <button
                    id='btn-show'
                    className='btn btn-primary' 
                    onClick={showTests}> Show tests </button>   
            </div>

        ) : (
            <div className='row'>
                <h3> There are no tests available at the moment!</h3>
            </div>
        )

        }
        
        </>
    )
}

export default Test