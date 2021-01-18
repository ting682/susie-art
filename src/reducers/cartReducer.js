export function cartReducer(state = { cart: [], requesting: false, loaded: false}, action) {

    let item;
    let cart;

    switch(action.type) {

        case "START_REQUESTING_CART":
            return {
                cart: [],
                requesting: true,
                loaded: false
            }

        case 'ADD_ITEM_TO_CART':

            cart = [...state.cart]

            item = action.payload

            cart.push(item)

            return {
                cart: cart,
                requesting: false,
                loaded: true
            }
        
        case "GET_CART":
            return {
                cart: action.payload.lineItems,
                requesting: false,
                loaded: true
            }

        default:
            return state
    }

}