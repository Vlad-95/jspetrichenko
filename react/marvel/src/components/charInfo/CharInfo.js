import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';

import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }
    
    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = data;
    
    let imgStyle = (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? {'objectFit' : 'contain'} : {'objectFit' : 'cover'};

    return (
        <>
            <div className="char__basics">
                <img style={imgStyle} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Empty'}
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
                
            </ul>

        </>
    )
}

// Проверка типов полей
CharInfo.propTypes = {
    charId: PropTypes.number, //Каким должен быть тип. Если будет ошибка, то она попадет в консоль
}

export default CharInfo;