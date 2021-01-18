import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import { artsReducer } from "./artsReducer";
import { artReducer } from "./artReducer";
import { aboutReducer } from "./aboutReducer";
import { blogsReducer } from './blogsReducer'
import { blogReducer } from "./blogReducer";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    arts: artsReducer,
    art: artReducer,
    about: aboutReducer,
    blogs: blogsReducer,
    blog: blogReducer,
    user: userReducer,
    cart: cartReducer
})