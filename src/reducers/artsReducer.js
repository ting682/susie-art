export function artsReducer(state = { arts: [], requesting: false, loaded: false}, action) {
    let art;
    let arts;
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

        case 'UPDATE_ART':

            // debugger
            arts = {...state.arts}

            art = arts[action.payload.slug]

            art.description = action.payload.description

            art.price = action.payload.price

            delete arts[action.payload.slug]
            
            arts[action.payload.slug] = art

            //debugger
            return {
                ...state,
                arts: arts
            }

        default:
            return state
    }
}