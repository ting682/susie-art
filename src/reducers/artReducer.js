export function artReducer(state = { art: [], requesting: false, loaded: false}, action) {

    switch(action.type) {

        case 'START_REQUESTING_ART':

            return {
                ...state,
                art: [],
                requesting: true,
                loaded: false
            }

        case 'GET_ART':
            //debugger
            return {
                ...state,
                art: action.payload,
                requesting: false,
                loaded: true
            }

        default:
            return state
    }
}