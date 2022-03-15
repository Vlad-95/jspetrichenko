import { Component } from 'react';

import './employers-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.name.length) {
            if (this.state.salary.length) {
                this.props.onAdd(this.state.name, this.state.salary);

                this.setState({
                    name: '',
                    salary: ''
                })
            }
           
        }
        
    }

    render() {
        const {onAdd} = this.props;
        const {name, salary } = this.state;
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex" onSubmit={this.onSubmit}>
                    <input onChange={this.onValueChange} type="text"
                        className="form-control new-post-label"
                        name="name"
                        value={name}// этот атрибут делает инпут управляемым. Введенное значение сразу передается в value
                        placeholder="Как его зовут?" />
                    <input onChange={this.onValueChange} type="number"
                        className="form-control new-post-label"
                        name="salary"
                        value={salary}// этот атрибут делает инпут управляемым. Введенное значение сразу передается в value
                        placeholder="З/П в $?" />
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;