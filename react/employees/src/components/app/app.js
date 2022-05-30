import { Component } from 'react/cjs/react.production.min';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: "Vlad Z", salary: 800, increase: true, rise: true, id: 1},
        {name: "Yar Z", salary: 500, increase: false, rise: false, id: 2},
        {name: "Igor Z", salary: 100, increase: false, rise: false, id: 3}
      ],
      term: '',
      filter: 'all'
    }

    this.newId = 4;
  } 

  deleteItem = (id) => {
    this.setState(({data}) => {
      // const index = data.findIndex(elem => elem.id == id);
      
      const newArr = data.filter(elem => elem.id !== id);

      return {
        data: newArr
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      id: this.newId++
    }

    this.setState(({data}) => {
      const newArr = [...data, newItem]

      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
        data: data.map(item => {
            if (item.id === id) {
                return {...item, [prop]: !item[prop]}
            }
            return item;
        })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter)

    return (
      <div className="app">
          <AppInfo  employees={employees} increased={increased}/>
  
          <div className="search-panel">
              <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList 
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
