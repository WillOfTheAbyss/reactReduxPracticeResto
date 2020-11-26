export const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
};

export const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED'
    }
};

export const addedToCard = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
};

export const deleteCard = (id) => {
    return {
        type: 'ITEM_DELETE_FROM_CART',
        payload: id
    }
};

export const menuError = (message) => {
    return {
        type: 'MENU_ERROR',
        payload: message
    }
};

export const itemChoose = (item) => {
    return {
        type: 'ITEM_CHOOSED',
        payload: item
    }
};

export const getOrderList = () => {
    return {
        type: 'GET_ORDER',
    }
};

export const clearOrder = () => {
    return {
        type: 'CLEAR_ORDER',
    }
};
