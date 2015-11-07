import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import merge from 'lodash/object/merge';
import counter from './counter';
import user from './user';
import * as ActionTypes from '../actions';
import paginate from './paginate';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { pubs: {}, trips: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

function pages(state = { pubsPage: [] }, action) {
	if (action.type === ActionTypes.PUBS_SUCCESS) {
		return merge({}, state, { pubsPage: action.response.result });
	}
	
	return state;
}

const pagination = combineReducers({
	allPubs: paginate({
		mapActionToKey: null,
		types: [
			ActionTypes.PUBS_REQUEST,
			ActionTypes.PUBS_SUCCESS,
			ActionTypes.PUBS_FAILURE
		]
	}),
	tripsByPub: paginate({
		mapActionToKey: action => action.pubId,
		types: [
			ActionTypes.PUBTRIPS_REQUEST,
			ActionTypes.PUBTRIPS_SUCCESS,
			ActionTypes.PUBTRIPS_FAILURE
		]
	})
})

let tripSavesInFlight = 0;
function saving(state = { trip: false }, action) {
	switch(action.type) {
		case ActionTypes.CREATE_TRIP_REQUEST:
			tripSavesInFlight++;
			break;
		case ActionTypes.CREATE_TRIP_SUCCESS:
		case ActionTypes.CREATE_TRIP_FAILURE:
			tripSavesInFlight--;
			break;
		default:
			return state;
	}
	
	return merge({}, state, { trip: tripSavesInFlight > 0})
}

const rootReducer = combineReducers({
	entities,
	pages,
	pagination,
	saving,
	counter,
	user,
	router: routerStateReducer
});

export default rootReducer;