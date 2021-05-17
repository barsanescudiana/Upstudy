const { useState } = require("react")

const User = (props) => {
    
    const [user, setUser] = useState(props.user)

    return (
    
        <h3> {user.name}
            <span className="badge rounded-pill bg-light text-primary"> 🥇 {user.score} points </span>
        </h3>
    
    )
}

export default User