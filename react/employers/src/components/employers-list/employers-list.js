import EmployersListItem from "../employers-list-item/employers-list-item";

import './employers-list.css';

const EmployersList = ({data, onDelete, onToggleProp}) => {

    const elements = data.map((item) => {
        const {id, ...itemProps} = item; // вытаскиваем отдельно переменную ID
        return (
            // <EmployersListItem name={item.name} salary={item.salary}/>
            <EmployersListItem 
                key={id}
                {...itemProps}// генерация с помощью спрэд оператора
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => {onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}}/> 
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployersList;