import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployeesAddForm from '../employers-add-form/employers-add-form';

import './app.css';

function App() {
    const data = [
        {name: "John", salary: 800, increase: true},
        {name: "Vlad", salary: 3000, increase: false},
        {name: "Alex", salary: 5000, increase: false}
    ];

    return (
        <div className="app">
            <AppInfo/>

            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>

            <EmployersList data={data}/>
            
            <EmployeesAddForm/>
        </div>
    );
}

export default App;