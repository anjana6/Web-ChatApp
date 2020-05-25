import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducer';

const middleware = [thunk];
const EnhanserWithDevTool = composeWithDevTools(...applyMiddleware(middleware));

const configureStore = createStore(rootReducer,EnhanserWithDevTool);

export default configureStore;