import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import counter from './counter';
import user from './user';

const rootReducer = combineReducers({
	counter,
	user,
	router: routerStateReducer
});

export default rootReducer;