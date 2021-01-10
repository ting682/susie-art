export function blogsReducer(state = { blogs: [], requesting: false, loaded: false}, action) {

    let blogs;
    let blog;
    switch(action.type) {

        case 'REQUESTING_BLOGS':
            return {
                ...state,
                blogs: [],
                requesting: true,
                loaded: false
            }

        case 'GET_BLOGS':
            return {
                ...state,
                blogs: action.payload,
                requesting: false,
                loaded: true
            }
        
        case 'UPDATE_BLOG':
            blogs = {...state.blogs}

            blog = blogs[action.payload.blogId]

            blog.content = action.payload.content

            blog.updatedAt = action.payload.updatedAt

            delete blogs[action.payload.blogId]
            
            blogs[action.payload.blogId] = blog

            //debugger
            return {
                ...state,
                blogs: blogs
            }

        default:
            return state
    }
}