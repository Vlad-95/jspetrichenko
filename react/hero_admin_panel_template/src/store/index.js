import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../reducers/filters';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }

    return next(action)
};

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

// const store = createStore(
//                     combineReducers({heroes, filters}),
//                     compose(applyMiddleware(ReduxThunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
                    
//                     // compose(
//                     //     enhancer,
//                     //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                     // )
//                     ) 

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})
    

export default store;