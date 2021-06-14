import axios from "axios"
import{ server } from '../pages/GlobalVariables'
import { useState } from "react"

const User = (props) => {
    
    const [user, setUser] = useState(props.user)
    const [words, ] = useState(0)

     const updateUser = () => {
        axios.get(`${server}/api/user/${user.email}`)
        .then((res) => {
            setUser(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

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