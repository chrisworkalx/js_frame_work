import './App.css';
import Router from './router';

function App() {
  return (
    <>
      <div className="card">
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
