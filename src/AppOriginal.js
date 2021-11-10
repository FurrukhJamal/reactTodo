import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [count, setCount] = useState(0)

  const increment = ()=>{
    setCount(count + 1)
  }

  function decrement(){
    setCount(count - 1)
  }

  return (
    <div className="App">
      <header className="App-header">
      <div >
        <span>{count}</span>
        <button
          style = {{marginRight: 23}}
          onClick = {increment}>+</button>
        <button onClick = {decrement}>-</button>
      </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{3 + 5}</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
