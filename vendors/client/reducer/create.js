import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import messageMiddleware from './middleware/messageMiddleware';
import reducer from './modules/reducer';

export default function createStore(initialState = {}) {
  const middleware = [thunkMiddleware, promiseMiddleware, messageMiddleware];

  let finalCreateStore;
  if (process.env.NODE_ENV === 'production') {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  } else {
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : require('../containers/DevTools/DevTools').instrument()
    )(_createStore);
  }

  const store = finalCreateStore(reducer, initialState);

  return store;
}
