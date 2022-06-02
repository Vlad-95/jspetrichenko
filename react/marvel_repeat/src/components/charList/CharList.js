import { Component } from 'react/cjs/react.production.min';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => (
            {
                charList: [...charList, ...newCharList], 
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            }
        ))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems(arr) {
        const items = arr.map(item => {
            let imgStyle = (item.thumbnail.includes('image_not_available')) ? {objectFit: 'contain'} : {};
            return (
                <li 
                    className="char__item" key={item.id}
                    onClick={() => {this.props.onCharSelected(item.id)}}>
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

    render() {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.renderItems(charList);

        const errorMsg = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMsg}
                {spinner}
                {content}
                <button 
                    onClick={() => this.onRequest(offset)}
                    disabled={newItemLoading} 
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    className="button button__main button__long"
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;