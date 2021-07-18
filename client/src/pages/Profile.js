import User from "../components/User"
import { useState, useEffect } from 'react'
import {useHistory} from 'react-router'
import Known from "../components/Known"
import Edit from "../components/Edit"
import Tests from '../components/Tests'
import {server} from './GlobalVariables'
import axios from 'axios'
 
const Profile = () => {

    const [user, ] = useState(JSON.parse(localStorage.getItem('user')))
    const [taken, setTaken] = useState([])

    const [clicked, setClicked] = useState('view')

    const history = useHistory()

    const handleLogOut = (e) => {
        localStorage.removeItem('user')
        history.push('/login')
    }

    
    useEffect(() => {
        axios.get(`${server}/api/user/allTests/${user.email}`)
        .then(res => {
            setTaken(res.data)
        })
        .catch(err => {
            console.error(err)
        })

    }, [])

    return(

        <div className='d-grid'>
            <div className='row'>
            <div className='col col-sm-4 align-self-start align-items-start m-3'> 
                This is your profile,   
                    <span>
                        <User user={user} className='p-1'></User>
                    </span>

                <div className='d-flex flex-column buttons-container'>
                    <button 
                        type='button'
                        className='btn btn-primary btn-sm rounded m-1'
                        onClick={() => setClicked('view')}>
                        📑 View known words
                    </button>
                     <button 
                        type='button'
                        className='btn btn-primary btn-sm rounded m-1'
                        onClick={() => setClicked('tests')}>
                        🗂️ View taken tests
                    </button>
                    <button 
                        type='button'
                        className='btn btn-secondary btn-sm rounded m-1'
                        onClick={() => setClicked('edit')}>
                        ✏️ Edit profile
                    </button>
                    <button 
                        type='button'
                        className='btn btn-light btn-sm rounded m-1'
                        onClick={(e) => {
                            handleLogOut(e)
                        }}>
                        ⚙️ Log out
                    </button>
                </div>
                
            </div>
            <div className='col align-self-center align-items-center m-3'>
            { clicked === 'view' ? (
                <Known user={user}> </Known>
            ) : clicked === 'edit' ? (
                <Edit user={user}> </Edit>
            ) : (
                <Tests user={user} tests={taken}></Tests>
            )}
            </div>
            </div>
            <button
                type='submit'
                className='btn btn-outline-dark position-absolute m-3 top-0 start-0'
                onClick={(e) => {
                    history.push('/')
                }}> <i className="fas fa-long-arrow-alt-left"></i> Back </button>
        </div>

    )
}

export default Profile