import {useState} from 'react'

const CreateNote = (props) => {

    const [word, setWord] = useState(props.word)

    return (
        <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">Create a new 📓 </h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <p>.....</p>
            </div>
        </div>
    )
}

export default CreateNote