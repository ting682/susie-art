export function cartReducer(state = { cart: [], jwtCart: [], requesting: false, loaded: false}, action) {

    let item;
    let cart;

    switch(action.type) {

        case "START_REQUESTING_CART":
            return {
                cart: [],
                jwtCart: [],
                requesting: true,
                loaded: false
            }

        case 'ADD_ITEM_TO_CART':

            cart = [...state.cart]

            item = action.payload

            cart.push(item)

            return {
                ...state,
                cart: cart,
                requesting: false,
                loaded: true
            }
        
        case "GET_CART":
            return {
                ...state,
                cart: action.payload.lineItems,
                requesting: false,
                loaded: true
            }

        case 'GET_JWT_CART':
            // debugger
            return {
                ...state,
                jwtCart: action.payload,
                requesting: false,
                loaded: true
            }

        case 'UPDATE_CART':
            

            return {
                ...state,
                jwtCart: action.payload.data,
                requesting: false,
                loaded: true
            }
        default:
            return state
    }

}