import {useState, useEffect, useRef} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {error, loading, getAllComics} = useMarvelService();
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);        
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;

        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? {'objectFit' : 'contain'} : {'objectFit' : 'cover'};
            
            return (
                <li 
                    className="comics__item"
                    tabIndex={0}
                    key={i}>
                    <a href="#">
                        <img src={item.thumbnail} style={imgStyle} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button onClick={() => onRequest(offset)} disabled={newItemLoading} style={{'display': comicsEnded ? 'none' : 'block'}} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;