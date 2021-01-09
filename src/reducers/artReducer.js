export function artReducer(state = { art: [], images: [], requesting: false, requestingImages: false, artLoaded: false, imagesLoaded: false}, action) {


    switch(action.type) {

        

        case 'START_REQUESTING_ART':

            return {
                ...state,
                art: [],
                requesting: true,
                artLoaded: false
            }

        case 'GET_ART':
            //debugger
            return {
                ...state,
                art: action.payload,

                requesting: false,
                artLoaded: true
            }
        

        case 'START_REQUESTING_IMAGES':

            return {
                ...state,
                images: [],
                requestingImages: true,
                imagesLoaded: false
            }

        case 'GET_IMAGE':

            return {
                ...state,
                images: [...state.images, action.payload],
                requesting: false,
                imagesLoaded: false
            }
        
        case 'FINISHED_LOADING_IMAGES':

            return {
                ...state,
                imagesLoaded: true,
                requestingImages: false
            }

        default:
            return state
    }
}