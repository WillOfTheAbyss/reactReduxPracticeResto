import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import WithRestoService from '../hoc/';
import Spinner from '../spinner';
import Error from '../error';
import { menuRequested, menuError, addedToCard, itemChoose } from '../../actions';
import './itemPage.css';

const ItemPage = (props) => {
    
    const {RestoService, menuRequested, menuError, itemChoose} = props;

    useEffect(() => {
        menuRequested();
        RestoService.getItem(props.match.params.id)
            .then(res => itemChoose(res))
            .catch(error => menuError(error.message));
    }, [RestoService, itemChoose, menuError, menuRequested, props.match.params.id]);
    
    if (props.error){
        return <Error status = {props.error}/>
    }

    return props.loading ? <Spinner /> : <View item = {props.choosedItem} addedToCard = {props.addedToCard}/>

}

const mapStateToProps = (state) => {
    return {
        choosedItem: state.choosedItem,
        loading: state.loading,
        error: state.error,
    }
}

const mapDispatchToProps = {
    menuRequested,
    menuError,
    addedToCard,
    itemChoose
}

const View = ({item:{title, url, category, price, id}, addedToCard}) => {
    return (
        <div className = "item_page">
            <div className="menu__item item_block">
                <div className="menu__title">{title}</div>
                <img className="menu__img" src={url} alt={title}></img>
                <div className="menu__category">Category: <span>{category}</span></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <button onClick = {() => addedToCard(id)} className="menu__btn">Add to cart</button>
                <span className = {`menu__category_Img ${category}`}></span> 
            </div>
        </div>
    )
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));