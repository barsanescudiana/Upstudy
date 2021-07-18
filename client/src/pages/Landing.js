import './Landing.scss'
import { useHistory } from 'react-router'


const Landing = () => {

    const history = useHistory()
    const handleLogIn = (e) => {
        e.preventDefault()
        history.push('/login')
    }

    const handleRegister = (e) => {
        e.preventDefault()
        history.push('/register')
    }

    return (
        <div className='d-grid text-align-center'>
            <div className='row d-flex justify-content-center align-items-center'>
                <h1 className='col d-flex justify-content-center align-items-center'> Hello, this is <br/>
                    <span><img src='assets/logo-black.svg' alt='logo' className='w-100'></img></span>!
                </h1>
            </div>
            <div className='row align-items-center m-3'>
                <div className='col mt-2 mb-2 d-flex justify-content-center align-items-center'>
                    <button
                    className='landing-btn btn btn-primary rounded'
                    onClick={(e) => handleLogIn(e)}>
                    🏷️ <br/>
                    Log in
                </button>
                </div>
                
                <div className='col mt-2 d-flex justify-content-center align-items-center'>
                    <button
                    className='landing-btn btn btn-outline-primary rounded'
                    onClick={(e) => handleRegister(e)}>
                    📑 <br/>
                    Register
                    </button>
                </div>
            </div>
            <div className='row '> 
                <h4 className='text-primary'> ❔ What is Upstudy </h4>
                <p className='text-justify'> 
                    🧰 It is an app meant to help you accelerate your learning process of <strong>Spanish</strong>, based on <mark>the most common one thousand English words</mark>
                    <br/>
                    ⚙️ It uses diffrent techniques in order to boost your memory and to help you learn in entertaining ways, such as <mark><strong>flashcards</strong></mark>! 
                </p>
            </div>
        </div>
    )
}

export default Landing