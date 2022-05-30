import {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

// const Header = () => {
//   return <h2>Hellog Worl</h2>
// }

// const Field = () => {
//   return <input type="text" placeholder='haha'/>
// }

// class Field extends Component {
//   render() {
//     return <input type="text" placeholder='haha'/>
//   }
// }

// function Btn() {
//   const text = "Push";
//   // const result = () => {
//   //   return 'login'
//   // }

//   // const p = <p>haha</p>

//   const logged = false;

//   return <button>{logged ? text : 'haha'}</button>
// }


//УРОК с пропсами
// function WhoAmI ({name, surname, link}) {
//   return (
//     <div>
//       {/* <h1>My name is {name},surname - {surname} </h1> */}
//       {/* <h1>My name is {name.firstname},surname - {surname} </h1> */}
//       <h1>My name is {name()},surname - {surname} </h1>
//       <a href={link}>My link</a>
//     </div>
//   )
// }

//УРОК с состояниями
// class WhoAmI extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       years: 27
//     }
//   }

//   nextYear = () => {
//     console.log('+');
//     // this.setState({
//     //   years: this.state.years + 1
//     // })
//     this.setState(state => ({
//       years: state.years + 1
//     }))
//   }

//   render() {
//     const {name, surname, link} = this.props;
//     return (
//       <div>
//         <button onClick={this.nextYear}>++</button>
//         <h1>My name is {name},surname - {surname}, age - {this.state.years} </h1>
//         <a href={link}>My link</a>
//       </div>
//     )
//   }
// }


//УРОК с событиями в реакте
class WhoAmI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      years: 27,
      position: ''
    }

    // 1й способ. Жесткая привязка
    this.nextYear = this.nextYear.bind(this);
  }


  nextYear() { // при использовании обычных методов теряется контекст,
    console.log('+');
    // this.setState({
    //   years: this.state.years + 1
    // })
    this.setState(state => ({
      years: state.years + 1
    }))
  }

  commitInputChanges = (e) => {
    this.setState({
      position: e.target.value
    })
  }

  render() {
    const {name, surname, link} = this.props;
    const {position, years} = this.state;
    return (
      <div>
        <button onClick={this.nextYear}>++</button>
        <h1>My name is {name},
            surname - {surname}, 
            age - {years}, 
            position - {position} 
        </h1>
        <a href={link}>My link</a>
        <form>
          <span>Введите должность</span>
          <input type="text" onChange={this.commitInputChanges}/>
        </form>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      {/* <WhoAmI name="Vlad" surname="Zvezdin" link="empty"/>
      <WhoAmI name={{firstname: 'Vlad'}} surname="Zvezdin" link="empty"/> */}
      <WhoAmI name='Vlad' surname="Zvezdin" link="empty"/>
      <WhoAmI name='Yar' surname="Zvezdin" link="empty"/>
      
    </div>
  );
}

export default App;
