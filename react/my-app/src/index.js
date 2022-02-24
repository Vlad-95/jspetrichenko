import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//const elem = <h2>Hello World</h2>; // JSX препроцессор
//const elem = React.createElement('h2', {className: 'someclass'}, 'Hello World'); //Еще один вариант создания элемента

const text = 'Hello';

const elem = (
  <div>
    <h2 className='ss'>Текст: {text}:{2+2}</h2>
    <input type="text" name="" id="" />
    <button tabIndex={0}>Click</button>
  </div>
);

ReactDOM.render(
  elem,
  document.getElementById('root')
);