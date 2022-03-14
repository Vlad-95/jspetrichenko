import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployeesAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor (props) {
        super (props);

        this.state = {
            data : [
                {name: "John", salary: 800, increase: true, id: 1},
                {name: "Vlad", salary: 3000, increase: false, id: 2},
                {name: "Alex", salary: 5000, increase: false, id: 3}
            ]
        };

        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex((elem) => elem.id === id);
            
            /*
                копия исходного массива с данным нужна, чтобы не изменять исходные данные
                НЕЛЬЗЯ ИЗМЕНЯТЬ ИСХОДНЫЕ ДАННЫЕ В РЕАКТЕ
            */
            // 1й способ
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);

            // const newArr = [...before, ...after];

            // 2й способ
            const filteredData = data.filter(item => item.id != id);

            return {
                data: filteredData
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            id: this.maxId++
        };

        this.setState(({data}) => {
            const newArr = [...data, newItem];

            return {
                data: newArr
            }
        })
    }

    render() {
        return (
            <div className="app">
                <AppInfo/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployersList 
                    data={this.state.data} 
                    onDelete={this.deleteItem}/>
                
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }

    

    
}

export default App;