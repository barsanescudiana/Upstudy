import axios from "axios"
import{ server } from '../pages/GlobalVariables'
import { useState, useEffect } from "react"

const User = (props) => {
    
    const [user, setUser] = useState(props.user)
    const [words, setWords] = useState(0)

     const updateUser = () => {
        axios.get(`${server}/api/user/${user.email}`)
        .then((res) => {
            setUser(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    
    useEffect(() => {
        updateUser()

        props.words && props.words.length !== 0
            ? setWords(props.words) 
            : axios.get(`${server}/api/words/`)
        .then((res) => {
            setWords(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [words, props.words])

    return (
        user.role === 'user' ? (
            <h3> {user.name} <span> </span>
                <span className="badge rounded-pill bg-light text-primary"> 🥇 {user.score} points </span>
            </h3>
        ) : (
            <h3> {user.name} <span> </span>
                <span className="badge rounded-pill bg-light text-primary"> 📚 {words.length} words stored </span>
            </h3>
        )
    )
}

export default User