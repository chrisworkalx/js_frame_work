import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

function onFrameWorkFinished() {
  var postMessage = function (type, data) {
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: type,
          data: data
        },
        '*'
      );
    }
  };
  // 为了让URL地址尽早地更新，这段代码需要尽可能前置，例如可以直接放在document.head中
  postMessage('afterHistoryChange', { url: location.href });
}

window.onload = onFrameWorkFinished;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
