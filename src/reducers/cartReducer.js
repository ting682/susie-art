export function cartReducer(state = { cart: {}, requesting: false, loaded: false}, action) {

    switch(action.type) {

        case "START_REQUESTING_CART":
            return {
                cart: {},
                requesting: true,
                loaded: false
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