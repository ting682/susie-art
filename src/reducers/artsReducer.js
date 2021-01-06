export function artsReducer(state = { arts: [], requesting: false, loaded: false}, action) {

    switch(action.type) {

        case 'START_REQUESTING_ARTS':

            return {
                ...state,
                arts: [],
                requesting: true,
                loaded: false
            }

        case 'GET_ARTS':
            //debugger
            return {
                ...state,
                arts: action.payload,
                requesting: false,
                loaded: true
            }

        default:
            return state
    }
}