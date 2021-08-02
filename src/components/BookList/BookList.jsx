import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import style from './BookList.module.css';
import BookCover from '../images/book_cover.jpg'


export const BookList = () => {
    const { books, deleteBook, updateBook, getBooksFromLS } = useContext(GlobalContext);
    const [edit, setEdit] = useState(null);
    const [titleValue, setTitleValue] = useState('')
    const [authorValue, setAuthorValue] = useState('')
    const [yearValue, setYearValue] = useState('')
    const [isbnValue, setIsbnValue] = useState('')

    useEffect(()=> {
        const data = localStorage.getItem('books');
        if(data) {
            let newBookArr = JSON.parse(data)
            getBooksFromLS(newBookArr)
        }
    }, [])

    useEffect(()=> {
        localStorage.setItem('books', JSON.stringify(books))
    })

    const removeBook = (id) => {
        deleteBook(id)
    }

    const activateEdit = (book) => {
        setEdit(book.id);
        setTitleValue(book.title);
        setAuthorValue(book.author);
        setYearValue(book.publishYear);
        setIsbnValue(book.isbn)
    }

    const saveChanges = (id) => {
        const updatedBookArr = books.map(book => {
            if(book.id === id){
                book.title = titleValue;
                book.author = authorValue;
                book.publishYear = yearValue;
                book.isbn = isbnValue
            }
            return book
        })
        updateBook(updatedBookArr);
        setEdit(null)
    }



    return (
        <div className={style.bookList}>
            {books.map(book => (
                <div key={book.id}>
                    {edit !== book.id ? 
                    <div className={style.bookItem}>
                       <img alt='' className={style.bookImg} src={BookCover}/>
                        <div className={style.bookDescription}>
                            <div><b>Title:</b> {book.title}</div>
                            <div><b>Author:</b> {book.author}</div>
                            <div><b>Year of publishing:</b> {book.publishYear}</div>
                            <div><b>ISBN:</b> {book.isbn}</div>
                            <button className={style.editBtn} onClick={()=>activateEdit(book)}>Edit</button>
                            <button className={style.deleteBtn} onClick={()=>removeBook(book.id)}>X</button>
                        </div>
                    </div>
                    :
                    <form className={style.inEditMode}>
                          <img alt='' className={style.bookImg} src={BookCover}/>
                          <div>
                                <input className={style.itemInEditMode} value={titleValue} onChange={(e)=>setTitleValue(e.target.value)}/>
                                <input className={style.itemInEditMode} value={authorValue} onChange={(e)=> setAuthorValue(e.target.value)}/>
                                <input className={style.itemInEditMode} value={yearValue} onChange={(e)=> setYearValue(e.target.value)}/>
                                <input className={style.itemInEditMode} value={isbnValue} onChange={(e)=> setIsbnValue(e.target.value)}/>
                                <button className={style.saveBtn} onClick={()=>saveChanges(book.id)}>Save</button>
                        </div>
                    </form>
                
                }
                  
                </div>
            ))}
        </div>
    )
}
