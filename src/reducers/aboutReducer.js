export function aboutReducer(state = { about: [], requesting: false, loaded: false}, action) {


    switch(action.type) {

        case 'REQUESTING_ABOUT':

            return {
                ...state,
                requesting: true,
                loaded: false
            }
        
        case 'GET_ABOUT':

            return {
                ...state,
                about: action.payload,
                requesting: false,
                loaded: true
            }

        case 'UPDATE_ABOUT_TEXT':

            return {
                ...state,
                about: action.payload.about
            }

        default:
            return state

    }
}
