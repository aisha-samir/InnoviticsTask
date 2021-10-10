import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger, logger } from 'redux-logger';
import rootReducers from '../reducers';
import thunk from 'redux-thunk';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['presistReducer'],
  debug: true, //to get useful logging
};

const middleware = [];

middleware.push(thunk);

if (__DEV__) {
  middleware.push(createLogger());
}




const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = { enhancers };
//const store = createStore(reducers, applyMiddleware(...middleware));
const store = createStore(reducers, undefined, compose(...enhancers));
//const store = createStore(reducers, undefined, applyMiddleware(thunk));
const persistor = persistStore(store, persistConfig);
const configureStore = () => {
  return { persistor, store };
};

export default configureStore;
