import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import {menuLoaded, menuRequested, addedToCard, menuError} from '../../actions/';
import WithRestoService from '../hoc/';
import Spinner from '../spinner';
import Error from '../error';
import './menu-list.scss';

class MenuList extends Component {

    componentDidMount(){
        const {RestoService, menuRequested, menuLoaded, menuError} = this.props;
        menuRequested();
        RestoService.getMenuItems()
            .then(res => menuLoaded(res))
            .catch(error => menuError(error.message));
    }

    render() {
        const {menuItems, loading, addedToCard, error} = this.props;
        const itemUrl = menuItems.map(item => {
            return item.id;
        });
        const items = menuItems.map(item => {
            return (
                <MenuListItem 
                    key = {item.id} 
                    menuItem = {item}
                    itemUrl = {itemUrl}
                    onAddToCart = {() => addedToCard(item.id)}
                />)
        });

        if(error){
            return <Error status = {error}/>
        }

        return loading ? <Spinner /> : <View items = {items}/>;
    }
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCard
};

const View = ({items}) => {
    return (
        <>
            <ul className="menu__list">
                {items}
            </ul>
        </>
    )
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));