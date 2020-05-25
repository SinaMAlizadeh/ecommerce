import { createStore , applyMiddleware } from 'redux';
import { persistStore} from 'redux-persist';
import logger from 'redux-logger';
import rootReducerfrom from  './root-reducer';
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
const sagaMiddleWare = createSagaMiddleware();

const middlewares = [logger , sagaMiddleWare ];

export const store = createStore(rootReducer , applyMiddleware(...middlewares));

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);

export default {store , persistor};
  