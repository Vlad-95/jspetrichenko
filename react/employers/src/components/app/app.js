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
                {name: "John", salary: 800, increase: false, like: true, id: 1},
                {name: "Vlad", salary: 3000, increase: true, like: false, id: 2},
                {name: "Alex", salary: 5000, increase: false, like: false, id: 3}
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
            rise: false,
            id: this.maxId++
        };

        this.setState(({data}) => {
            const newArr = [...data, newItem];

            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        // 1й вариант
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

        //     return {
        //         data: newArr
        //     }
            
        // })

        // 2й вариант
        this.setState(({data}) => ({
            
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }

                return item;
            })
        }))
    }

    render() {
        const employers = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;

        return (
            <div className="app">
                <AppInfo employers={employers} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployersList 
                    data={this.state.data} 
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }

    

    
}

export default App;