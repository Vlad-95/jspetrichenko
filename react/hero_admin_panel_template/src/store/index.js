import { createStore, combineReducers, compose } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

//ВКЛЮЧАЕТ РАБОТУ СО СТРОКАМИ ПРИ ВЫЗОВЕ ACTION
const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;//сохранили оригинальный объект, который содержит в себе объект

    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }

        return oldDispatch(action)
    }

    return store;
}

const store = createStore(
                    combineReducers({heroes, filters}),
                    compose(
                        enhancer,
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                    )) 
    

export default store;