import logo from './logo.svg';
import './App.css';

import Search from './components/Search';
import {

  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Search />
      </header>


    </div>
  );
}

export default App;
