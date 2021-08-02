
import './App.css';
import { AddBook } from './components/AddBook/AddBook';
import { BookList } from './components/BookList/BookList';
import { GlobalProvider } from './components/context/GlobalContext';
import { Header } from './components/Header/Header';

function App() {
  return (
    <GlobalProvider>
        <div className='container'>
          <Header />
          <AddBook />
          <BookList />
        </div>
    </GlobalProvider> 
  );
}

export default App;
