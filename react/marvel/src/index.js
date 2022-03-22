import React from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';
  
// marvelService.getCharacter('1011052').then(res => console.log(res));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

