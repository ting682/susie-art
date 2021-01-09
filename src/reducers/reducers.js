import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import { artsReducer } from "./artsReducer";
import { artReducer } from "./artReducer";
import { aboutReducer } from "./aboutReducer";

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    arts: artsReducer,
    art: artReducer,
    about: aboutReducer
})