import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
import reducers from './reducers';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
    );

ReactDOM.render((
<Provider store={store} >
    <App/>
</Provider>
),document.querySelector('#root'));