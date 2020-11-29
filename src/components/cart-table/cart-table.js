import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {deleteCard, getOrderList, menuError, clearOrder} from '../../actions/';
import { Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import WithRestoService from '../hoc/';
import './cart-table.scss';

const CartTable = (props) => {

    const {order, RestoService, clearOrder, menuError} = props;

    useEffect(() => {
            if(!(Object.keys(order).length === 0)){
                RestoService.setOrder(order)
                    .catch(err => menuError(err));
            }
        }, 
    [RestoService, menuError, order]);

    useEffect(() => {
            return () => clearOrder();
        },
    [clearOrder]);

    const {items, deleteCard, getOrderList, error} = props;

    const orderBtn = items.length === 0 ? null 
        : (<Button 
            color='success' 
            size='lg' 
            onClick = {() => getOrderList()}
            block style = {{marginTop: 20}}>Оформить заказ</Button>);

        return (
            <View  
            btn = {orderBtn} 
            items = {items} 
            error = {error}
            deleteCard = {deleteCard}
            order= {order}/>
        );
};

const mapStateToProps = ({items, order, error}) => {
    return {
        items,
        order,
        error
    }
};

const mapDispatchToProps = {
    deleteCard,
    getOrderList,
    menuError,
    clearOrder
}

const View = ({items, btn, error, order, deleteCard}) => {
    if(error){
        btn = <Alert color="danger">В данный момент заказы отправить нельзя</Alert>
    }
    if(!(Object.keys(order).length === 0)){
        return (
            <>
                <Alert color="success" className="cart__title">Заказ успешно принят</Alert>
                <Link to = '/'><Button color="primary">Вернутся на главную страницу</Button></Link>
            </>
        )
    }
    return (
        <>  
            <div className="cart__title">{items.length === 0 ? 'Ваша корзина пуста' : 'Ваш заказ:'}</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, count = 1} = item;
                        return (
                            <div key = {id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className="cart__item-price">{`${count}шт`}</div>
                                <div onClick = {() => deleteCard(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
                {btn}
            </div>
        </>
    )
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));