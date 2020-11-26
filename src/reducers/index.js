const initialState = {
    menu: [],
    loading: true,
    error: '',
    items: [],
    choosedItem: {},
    totalPrice: 0,
    order: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: ''
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true,
                error: ''
            };
        case 'MENU_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'ITEM_ADD_TO_CART':
            const cartItem = state.menu.find(item => item.id === action.payload);
            return {
              ...state,
              totalPrice: state.totalPrice + +cartItem.price,
              items: !state.items.find((item) => item.id === cartItem.id)
                ? [...state.items, cartItem]
                : state.items.map((item) => {
                      if (item.id === cartItem.id) {
                        if (!item.count) {
                          item.count = 2;
                        } else {
                          item.count++;
                        }
                        return item;
                      } else {
                        return item;
                      }
                    })
            };
        case 'ITEM_DELETE_FROM_CART':
            let itemPrice = 0;
            // eslint-disable-next-line array-callback-return
            const arrWithout = state.items.filter(item => {
                if (item.id === action.payload){
                    itemPrice = item.price;
                    if (item.count && item.count > 1){
                        item.count--;
                        return item;
                    }
                } else {
                    return item;
                }
            });
            return {
                ...state,
                totalPrice: state.totalPrice - +itemPrice,
                items: arrWithout
            };
        case 'ITEM_CHOOSED':
            return {
                ...state,
                loading: false,
                error: '',
                choosedItem: action.payload
            }
        case 'GET_ORDER':
            const orederList = {
                goods: state.items.map(item => {
                    return {
                        name: item.title,
                        price: item.price,
                        count: item.count ? item.count : 1
                    }
                }),
                orderCost: state.totalPrice
            }
            console.log(orederList);
            return {
                ...state,
                items: [],
                totalPrice: 0,
                order: orederList
            }
        case 'CLEAR_ORDER':
            return {
                ...state,
                order: {}
            }
        default:
            return state;
    }
}

export default reducer;