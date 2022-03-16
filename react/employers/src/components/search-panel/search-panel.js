import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component{
    constructor (props) {
        super(props);

        this.state = {
            term: ''
        }
    }

    /* Это работает локально */
    onUpdateSearch = (e) => {
        const term = e.target.value;

        this.setState({term});
        /*
        Эта функция пришла из вне. Не важно, что у них имена одинаковые. 
        ЭТО РАЗНЫЕ ФУНКЦИИ
        */
        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <input type="text" 
                className="form-control search-input" 
                placeholder="Найти сотрудника" 
                name="" id="" 
                value={this.state.term}
                onChange={this.onUpdateSearch}/>
        )
    }
}

export default SearchPanel;