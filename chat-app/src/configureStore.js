import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducer';
import setAuthtoken from './utils/setAuthtoken';

const middleware = [thunk];
const EnhanserWithDevTool = composeWithDevTools(applyMiddleware(...middleware));

const configureStore = createStore(rootReducer,EnhanserWithDevTool);

if(localStorage.token){
    setAuthtoken(localStorage.token);
}

export default configureStore;