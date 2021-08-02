import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import style from './AddBook.module.css'

export const AddBook = () => {

    const { addBook } = useContext(GlobalContext)

    const [book, setBook] = useState({
        title: '',
        author: '',
        publishYear: '',
        isbn: ''
    })

    const [yearError, setYearError] = useState(false);
    const [isbnError, setIsbnError] = useState(false);
    const [message, setMessage] = useState(false);

    const errorStyle = {
        border: 'red 2px solid',
        borderRadius: '3px'

    }


    const onChange = (e) => {
      setBook({
            ...book,
            [e.target.name]: e.target.value
        }) 
    }

    const validYear = new RegExp(
        '^(?:[1-9]{4})?$'
    )

    const validIsbn = new RegExp(
        '^(?:[0-9]{3}-[0-9]{4})?$'
    )


    
    const onSubmit = (e) => {
        e.preventDefault();
        if(!book.title || !book.author){
            setMessage(true);
            setTimeout(() => setMessage(false), 3000);
        } else if(!validYear.test(book.publishYear)) {
            setYearError(true);
            setTimeout(()=>  setYearError(false), 2000)
        } else if(!validIsbn.test(book.isbn)){
            setIsbnError(true);
            setTimeout(()=>  setIsbnError(false), 2000)
        } else {
            const newBook = {
                ...book,
                id: Math.floor(Math.random() * 10000)
            }
            
            addBook(newBook);
            setBook({
                title: '',
                author: '',
                publishYear: '',
                isbn: ''
            })
        }
     }
        

    return (
        <form className={style.formControl} onSubmit={onSubmit}>
            <input value={book.title} type='text' name='title' placeholder='Book title...' onChange={onChange} style={message? errorStyle : null}/>
            <input value={book.author} type='text' name='author' placeholder='Book author...' onChange={onChange} style={message? errorStyle : null}/>
            <input value={book.publishYear} type='number' name='publishYear' placeholder='Publishing year...' onChange={onChange} style={yearError? errorStyle : null}/>
            <input value={book.isbn}  name='isbn' placeholder='ISBN...' onChange={onChange} style={isbnError? errorStyle : null}/>
          
            <div><button className={style.submitBtn}>Submit</button></div>

            {yearError && <p className={style.validationError}>Year must be 4 symbols</p>}
            {isbnError && <p className={style.message}>ISBN format: xxx-xxxx</p>}
            {message && <p className={style.message}>Please enter both author and title of the book</p>}

        </form>
    )
}


    