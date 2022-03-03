import {Component, StrictMode} from 'react';
import './App.css';

const Header = () => {
  return <h2>Hello world</h2>
};

// const Field = () => {
//   const styledField = {
//     width: '300px'
//   };

//   return <input type="text" placeholder='Type here' style={styledField} type='Text'/>
// }

class Field extends Component {
  render() { // Главный метод, он должен быть обязательно
    const styledField = {
      width: '300px'
    };
  
    return <input type="text" placeholder='Type here' style={styledField} type='Text'/>
  }
}

function Btn() {
  const text = 'Log in';
  // const res = () => {
  //   return 'Log in + s'
  // }
  // const p = <p>Haha</p>

  const logged = true;

  // return <button>{res()}</button>
  //return <button>{p}</button>
  return <button>{logged ? 'Enter' : text}</button>
}

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <Field/>
      <Btn/>
    </div>
  );
}
export {Header}
export default App;
