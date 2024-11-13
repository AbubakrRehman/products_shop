import { useState } from 'react';
import './App.css';
import Products from './components/Products/Products';
import Bookmarks from './components/Bookmarks/Bookmarks';

function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <div className="App">
      <button onClick={toggle}>{!isOpen ? "Go to Bookmark ": "Go to Product"}</button>
      {
        !isOpen ? <Products/> : <Bookmarks/>
      }
    </div>
  );
}

export default App;
