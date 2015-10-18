import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import merge from 'lodash/object/merge';
import counter from './counter';
import user from './user';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { pubs: {}, trips: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

const rootReducer = combineReducers({
	entities,
	counter,
	user,
	router: routerStateReducer
});

export default rootReducer;