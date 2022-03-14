import EmployersListItem from "../employers-list-item/employers-list-item";

import './employers-list.css';

const EmployersList = ({data, onDelete}) => {

    const elements = data.map((item) => {
        const {id, ...itemProps} = item; // вытаскиваем отдельно переменную ID
        return (
            // <EmployersListItem name={item.name} salary={item.salary}/>
            <EmployersListItem 
                key={id}
                {...itemProps}
                onDelete={() => onDelete(id)}/> // генерация с помощью спрэд оператора
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployersList;