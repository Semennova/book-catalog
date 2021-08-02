import { createContext, useReducer } from "react";
import { reducer } from "./AppReducer";


const initialState = {
    books: [
        {id: 1122, img: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', title: 'Под алыми небесами', author: 'Марк Салливан', publishYear: '2014', isbn: '1234'},
        {id: 2233, img: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', title: 'Нью Йорк', author: 'Эдвард Резерфорд', publishYear: '2015', isbn: '4567'},
        {id: 3344, img: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', title: 'Мальчик на вершине горы', author: 'Джон Бойн', publishYear: '2015', isbn: '7890'},
        {id: 4455, img: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', title: 'Замок Броуди', author: 'Арчибальд Кронин', publishYear: '2014', isbn: '0123'}
    ]
}



export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    function addBook(book) {
        dispatch({
            type: 'ADD_BOOK',
            payload: book
        })
    }

    function deleteBook(id) {
        dispatch({
            type: 'DELETE_BOOK',
            payload: id
        })
    }

    function updateBook(updatedBookArr){
        dispatch({
            type: 'UPDATE_BOOK',
            payload: updatedBookArr
        })
    }

    function getBooksFromLS(bookArrFromLS) {
        dispatch({
            type: 'SAVE_TO_LS',
            payload: bookArrFromLS
        })
    }


    return (<GlobalContext.Provider value={
        {books: state.books, addBook, deleteBook, updateBook, getBooksFromLS} }>
            {children}
        </GlobalContext.Provider>
    )
}