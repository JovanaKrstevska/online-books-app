import './App.css';
import BooksLayout from './components/BooksLayout/BooksLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <img className='backgroungImage' src="/assets/images/backgroundBooks.jpg"/>
      <BooksLayout />
    </>
  );
}

export default App;
