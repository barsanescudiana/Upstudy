import axios from "axios"
import { useState, useEffect } from "react"
import uuid from 'react-uuid'
import User from "../components/User"
import { server } from './GlobalVariables' 
import WordCard from "../components/WordCard"
import { useHistory } from "react-router"

const AllWords = (props) => {

    const [words, setWords] = useState(props.location.state.words)
    const [user, ] = useState(JSON.parse(localStorage.getItem('user')))
    const [allWords, setAllWords] = useState(props.location.state.allWords)
    let [currentPage, setCurrentPage] = useState(1)
    const numberPerPage = 100;
    const [pageList, setPageList] = useState(words.slice(((currentPage - 1) * numberPerPage), ((currentPage - 1) * numberPerPage) + numberPerPage));
    const history = useHistory()

    const loadList = () => {
        var begin = ((currentPage - 1) * numberPerPage);
        var end = begin + numberPerPage;

        setPageList(words.slice(begin, end))
        console.log(pageList)
    }

    const handleDeleteWord = (e, word) => {
        axios.post(`${server}/api/words/delete`, {
            base: word.base
        })
        .then((res) => {
            setWords(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const load = () => {
        loadList()
    }

    const handlePageClick = (e) => {
    //     console.log(currentPage)
    //     document.getElementById(currentPage).classList.remove('active')
    //     setCurrentPage(e.target.innerText)
    //     document.getElementById(e.target.innerText).classList.add('active')
    //     console.log(currentPage)
    //     loadList()
        document.getElementById(currentPage).classList.remove('active')
        currentPage = e.target.innerText
        document.getElementById(e.target.innerText).classList.add('active')
        console.log(currentPage)
        loadList()
    }

    const handlePreviuos = (e) => {
        if(currentPage !== 1) {
            e.preventDefault()
            document.getElementById(`${currentPage}`).classList.remove('active')
            setCurrentPage(currentPage -= 1)
            document.getElementById(`${currentPage}`).classList.add('active')
            console.log('next', currentPage)
            loadList()
        } else {
            document.getElementById('prev-btn').disabled = true
        }
    }

    const handleNext = (e) => {
        if(currentPage !== 10) {
            if ( document.getElementById('prev-btn').disabled === true ) {
                document.getElementById('prev-btn').disabled = false
            }
            e.preventDefault()
            document.getElementById(`${currentPage}`).classList.remove('active')
            setCurrentPage(currentPage += 1)
            document.getElementById(`${currentPage}`).classList.add('active')
            console.log('next', currentPage)
            loadList()
        }


        if(currentPage === 10) {
            document.getElementById('next').disabled = true
        }
    }

    useEffect(() => {
        if(currentPage === 1) document.getElementById('prev-btn').disabled = true
        if(currentPage === 10) document.getElementById('next-btn').disabled = true
    })
        
    window.addEventListener('load', load);

    return(
    <div className='p-2 m-2 d-grid'>

        <button
            type='submit'
            className='btn btn-outline-dark position-absolute m-3 top-0 end-0'
            onClick={(e) => {
                history.push('/')
            }}> <i className="fas fa-long-arrow-alt-left"></i> Back </button>

        <nav aria-label="..." className='row'>
            <ul className = 'pagination pagination-sm position-relative p-1 m-2 '>
                <li id='prev' disabled className="page-item"> <a id='prev-btn' className="page-link" tabindex="-1" aria-disabled="true" onClick={(e) => handlePreviuos(e)}>Previous</a> </li>
                <li id={1} className="page-item active" onClick={() => setCurrentPage(1)}> <a className="page-link" onClick={(e) => handlePageClick(e)} >1</a> </li>
                <li id={2} className="page-item" onClick={() => setCurrentPage(2)}> <a className="page-link" onClick={(e) => handlePageClick(e)}>2</a> </li>
                <li id={3} className="page-item" onClick={() => setCurrentPage(3)}> <a className="page-link" onClick={(e) => handlePageClick(e)}>3</a> </li>
                <li id={4} className="page-item" onClick={() => setCurrentPage(4)}> <a className="page-link" onClick={(e) => handlePageClick(e)}>4</a> </li>
                <li id={5} className="page-item" onClick={() => setCurrentPage(5)}> <a className="page-link" onClick={(e) => handlePageClick(e)}>5</a> </li>
                <li id={6} className="page-item" onClick={() => setCurrentPage(6)}> <a className="page-link" onClick={(e) => handlePageClick(e)}>6</a> </li>
                <li id={7}className="page-item" onClick={() => setCurrentPage(7)}> <a className="page-link" onClick={(e) => handlePageClick(e)}>7</a> </li>
                <li id={8} className="page-item" onClick={() => setCurrentPage(8)}> <a className="page-link" onClick={(e) => handlePageClick(e)}>8</a> </li>
                <li id={9} className="page-item" onClick={() => setCurrentPage(9)}> <a className="page-link" onClick={(e) => handlePageClick(e)}>9</a> </li>
                <li id={10} className="page-item"> <a className="page-link" onClick={(e) => handlePageClick(e)}>10</a> </li>
                <li id='next-btn' className="page-item"> <a id='next' className="page-link" onClick={(e) => handleNext(e)}>Next</a> </li>
            </ul>
        </nav>

        { words.length === 0 ? (

            <h4 className='mt-3'>
                No words added in our database! <a
                href='/'
                className='text-primary m-1'> <mark className='rounded text-primary'>  Add words here.  </mark></a>
            </h4> 
        ) : (
            <div id='list' className='row d-grid wrap p-2 m-4'>
                <div className='row'>
                {
                    pageList.map(element => (
                        <div className='col col-sm'>
                        <WordCard key={uuid()} word={element} handleDeleteWord={handleDeleteWord}/>
                        </div>
                    ))
                }
                </div>
            </div>
        )}
        
    </div>
    )
}

export default AllWords