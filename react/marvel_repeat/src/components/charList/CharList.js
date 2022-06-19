import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    // focusRef = React.createRef();
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []) // пустой массив означает, что хук вызовется один раз только при загрузке

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);        
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended)
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'contain'};
            }

            return (
                <li 
                    tabIndex={0}
                    className="char__item"
                    ref={el => itemRefs.current[i] = el} 
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        focusOnItem(i)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    <img style={imgStyle} src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        
        return (
            <ul className="char__grid">                
                {items}
            </ul>
        ); 
        
    }

    const items = renderItems(charList);

    const errorMsg = error ? <ErrorMessage/> : null;
    const spinner = (loading && !newItemLoading) ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMsg}
            {spinner}
            {items}
            <button 
                onClick={() => onRequest(offset)}
                disabled={newItemLoading} 
                style={{ 'display': charEnded ? 'none' : 'block' }}
                className="button button__main button__long"
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;