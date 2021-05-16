import { useState } from "react"

const Home = (props) => {

    const [user, setUser] = useState({})

    const handleUser = (data) => {
        setUser(data)
    }

    return (
        <div>
            <h1> Home component</h1>
            {console.log(user)}
        </div>
    )
}

export default Home