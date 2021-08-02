const ADD_BOOK = 'ADD_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';
const SAVE_TO_LS = 'SAVE_TO_LS'

export const reducer = (state, action) => {
    switch(action.type){
        case ADD_BOOK:
            return {
                ...state,
                books: [action.payload, ...state.books]
            }
        case DELETE_BOOK: 
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload)
            }
        case UPDATE_BOOK: 
            return {
                ...state,
                books: action.payload
            }
        case SAVE_TO_LS: 
        return {
            ...state,
            books: action.payload
        }
        default:
            return state
    }
}