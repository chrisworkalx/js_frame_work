import { useState } from 'react';
import './App.css';
import SetStateComp from './setState';

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
      </div>
    </>
  );
}

export default App;
