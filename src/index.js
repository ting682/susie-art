import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './reducers/reducers'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { ConnectedRouter } from 'connected-react-router'

export const history = createBrowserHistory()

const store = createStore(rootReducer(history), compose(applyMiddleware(thunk, routerMiddleware(history)), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
// const store = createStore(rootReducer(history), compose(applyMiddleware(thunk, routerMiddleware(history))))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
