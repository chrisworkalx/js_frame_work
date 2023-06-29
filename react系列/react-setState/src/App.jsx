import { useState } from 'react';
import './App.css';
import SetStateComp from './setState';
import Router from './router';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <hr />
        <SetStateComp />
        <hr />
        <div
          style={{
            height: '10px',
            width: '100%',
            background: '#f40',
            marginBottom: 20
          }}
        ></div>
        {Router}
      </div>
    </>
  );
}

export default App;
