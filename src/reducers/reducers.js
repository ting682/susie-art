import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import { artsReducer } from "./artsReducer";

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    arts: artsReducer
})