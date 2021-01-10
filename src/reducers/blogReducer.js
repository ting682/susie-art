export function blogReducer(state = { blog: [], requesting: false, loaded: false}, action) {

    switch(action.type) {

        case 'REQUESTING_BLOG':
            return {
                ...state,
                blogs: [],
                requesting: true,
                loaded: false
            }

        case 'GET_BLOG':
            return {
                ...state,
                blog: action.payload,
                requesting: false,
                loaded: true
            }

        default:
            return state
    }
}