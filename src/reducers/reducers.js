import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import { artsReducer } from "./artsReducer";
import { artReducer } from "./artReducer";

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    arts: artsReducer,
    art: artReducer
})