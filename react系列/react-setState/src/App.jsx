import { useState } from 'react';
import './App.css';
import SetStateComp from './setState';
import Router from './router';
import { Button } from 'antd';
import BorderInnerOutlined from '@ant-design/icons/BorderInnerOutlined';
import { BorderInnerOutlined as BorderInnerOutlinedCopy } from '@ant-design/icons';

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
        <Button type="primary">Button</Button>
        <BorderInnerOutlined />
        <BorderInnerOutlinedCopy />
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
