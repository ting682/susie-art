export function userReducer(state = { user: [], requesting: false, loaded: false}, action) {

    switch(action.type) {

        case "START_REQUESTING_USER":
            return {
                user: [],
                requesting: true,
                loaded: false
            }

        case "GET_USER":
            return {
                user: action.payload.uid,
                requesting: false,
                loaded: true
            }

        default:
            return state
    }

}