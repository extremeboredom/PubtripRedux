import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import assign from 'lodash/object/assign';
import merge from 'lodash/object/merge';
import defaults from 'lodash/object/defaults';
import omit from 'lodash/object/omit';
import without from 'lodash/array/without';
import counter from './counter';
import user from './user';
import * as ActionTypes from '../actions';
import paginate from './paginate';

// Updates an entity cache in response to any action with response.entities.
function entities(state, action) {
  state = defaults({}, state, { attendees: {}, pubs: {}, trips: {}, users: {}});
  
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  
  if (action.type === ActionTypes.REMOVE_ATTENDEE) {
	  const attendees = omit(state.attendees, action.attendeeId);
	  const updated = omit(state, 'attendees')
	  updated.attendees = attendees;
	  return updated;
  }

  return state;
}

function pages(state = { pubsPage: [] }, action) {
	if (action.type === ActionTypes.PUBS_SUCCESS) {
		return merge({}, state, { pubsPage: action.response.result });
	}
	
	return state;
}

const attendeesByTripPagination = paginate({
		mapActionToKey: action => action.tripId,
		types: [
			ActionTypes.ATTENDEES_REQUEST,
			ActionTypes.ATTENDEES_SUCCESS,
			ActionTypes.ATTENDEES_FAILURE,
		]
	});
	
function attendeesByTrip(state, action) {
	
	state = attendeesByTripPagination(state, action);
	
	if (action.type === ActionTypes.REMOVE_ATTENDEE) {
		const attendeesForTrip = without(state[action.tripId].ids, action.attendeeId);
		const pagination = assign({}, state[action.tripId], {ids: attendeesForTrip});
		return assign({}, state, { [action.tripId]: pagination});
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
	}),
	attendeesByTrip
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